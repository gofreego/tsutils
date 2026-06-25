/**
 * OpenClick Analytics Service
 *
 * Lightweight client-side analytics SDK for OpenClick.
 * Handles event batching, user identification, auto-properties,
 * session management, and reliable flushing via sendBeacon.
 *
 * Usage:
 *   openClickService.capture('button_clicked', { label: 'Upgrade' });
 *   openClickService.identify('user_42', { email: 'jane@example.com' });
 *   openClickService.reset(); // on logout
 */

import { HttpClient } from '../http/HttpClient'
import { LocalStorage } from '../utils'
import { SessionManager } from '../auth/sessionManager'

export interface OpenClickConfig {
    apiKey: string;
    httpClient: HttpClient;
    /** Max events to buffer before auto-flush (default: 10) */
    batchSize?: number;
    /** Flush interval in ms (default: 3000) */
    flushIntervalMs?: number;
    /** Enable autocapture of pageviews (default: true) */
    capturePageviews?: boolean;
    /** Respect navigator.doNotTrack (default: true) */
    respectDNT?: boolean;
}

interface EventPayload {
    event: string;
    distinct_id: string;
    timestamp: string;
    properties: Record<string, unknown>;
    session_id?: string;
}

const ANON_ID_KEY = 'oc_anon_id';
const USER_ID_KEY = 'oc_user_id';
const SESSION_ID_KEY = 'oc_session_id';

class OpenClickService {
    private static instance: OpenClickService;

    private config: OpenClickConfig | null = null;
    private queue: EventPayload[] = [];
    private flushTimer: ReturnType<typeof setInterval> | null = null;
    private distinctId: string = '';
    private userId: string | null = null;
    private sessionId: string = '';
    private initialized = false;
    private dntEnabled = false;
    private sessionManager = SessionManager.getInstance();

    private constructor() {
        // Singleton
    }

    public static getInstance(): OpenClickService {
        if (!OpenClickService.instance) {
            OpenClickService.instance = new OpenClickService();
        }
        return OpenClickService.instance;
    }

    // ─────────────────────────────────────────────────────────────────────
    // Initialization
    // ─────────────────────────────────────────────────────────────────────

    /**
     * Initialize the analytics service. Must be called once before any
     * capture/identify calls. Safe to call multiple times (idempotent).
     */
    public init(config: OpenClickConfig): void {
        if (typeof window === 'undefined') return;
        if (this.initialized) return;

        // Check Do Not Track
        if (config.respectDNT !== false) {
            const dnt = navigator.doNotTrack || (window as unknown as { doNotTrack?: string }).doNotTrack;
            if (dnt === '1' || dnt === 'yes') {
                this.dntEnabled = true;
                console.log('[OpenClick] Do Not Track enabled — analytics disabled');
                return;
            }
        }

        if (!config.apiKey) {
            console.warn('[OpenClick] No API key provided — analytics disabled');
            return;
        }

        this.config = this.withDefault(config);

        // Resolve distinct_id (anonymous until identify() is called)
        const { id, isNew } = this.getOrCreateAnonId();
        this.distinctId = id;
        this.userId = this.getUserId();
        // Resolve session_id (per browser tab session)
        this.sessionId = this.getOrCreateSessionId();

        // Start flush interval
        this.flushTimer = setInterval(() => {
            this.flush();
        }, this.config.flushIntervalMs);

        // Flush on page unload
        window.addEventListener('beforeunload', this.handleBeforeUnload);

        // Flush when page becomes hidden (more reliable on mobile)
        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        this.initialized = true;
        console.log('[OpenClick] Initialized', {
            distinctId: this.distinctId,
            sessionId: this.sessionId,
        });

        // Register the anonymous user with the backend on first ever visit
        if (isNew) {
            this.sendIdentify(this.distinctId);
        }
    }


    private withDefault(config: OpenClickConfig): OpenClickConfig {
        return {
            apiKey: config.apiKey,
            httpClient: config.httpClient,
            batchSize: config.batchSize || 10,
            flushIntervalMs: config.flushIntervalMs || 3000,
            capturePageviews: config.capturePageviews !== undefined ? config.capturePageviews : true,
            respectDNT: config.respectDNT !== undefined ? config.respectDNT : true,
        };
    }

    /**
     * Tear down the service (for cleanup / testing).
     */
    public destroy(): void {
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
            this.flushTimer = null;
        }

        if (typeof window !== 'undefined') {
            window.removeEventListener('beforeunload', this.handleBeforeUnload);
            document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        }

        this.flush();
        this.initialized = false;
    }

    // ─────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────

    /**
     * Track a custom event.
     */
    public capture(event: string, properties?: Record<string, unknown>): void {
        if (!this.isActive()) return;

        const payload: EventPayload = {
            event,
            distinct_id: this.getDistinctId(),
            timestamp: new Date().toISOString(),
            properties: {
                ...this.getAutoProperties(),
                ...properties,
            },
            session_id: this.sessionId,
        };

        this.queue.push(payload);

        // Auto-flush if batch size reached
        if (this.config && this.queue.length >= (this.config.batchSize || 10)) {
            this.flush();
        }
    }

    /**
     * Track a page view. Called by OpenClickProvider on route changes.
     */
    public capturePageview(url?: string): void {
        this.capture('page_view', {
            $current_url: url || (typeof window !== 'undefined' ? window.location.href : ''),
        });
    }

    /**
     * Flush all queued events to the server.
     */
    public async flush(): Promise<void> {
        if (!this.config || this.queue.length === 0) return;

        const events = [...this.queue];
        this.queue = [];

        try {
            await this.sendBatch(events);
        } catch (err) {
            // On failure, re-queue the events (at the front) for retry
            this.queue = [...events, ...this.queue];
            console.warn('[OpenClick] Flush failed, events re-queued:', err);
        }
    }

    /**
     * Get the current distinct_id.
     */
    public getDistinctId(): string {
        let userId = this.sessionManager.getUserUUID();
        if (userId) {
            if (userId!=this.userId){
                this.setUserId(userId);
                this.sendIdentify(userId);
            }
            return userId;
        }
        return this.distinctId;
    }

    // ─────────────────────────────────────────────────────────────────────
    // Private: Network
    // ─────────────────────────────────────────────────────────────────────

    private async sendBatch(events: EventPayload[]): Promise<void> {
        if (!this.config) return;

        await this.config.httpClient.post('/openclick/api/v1/batch', {
            api_key: this.config.apiKey,
            batch: events.map((e) => ({
                event: e.event,
                distinct_id: e.distinct_id,
                timestamp: e.timestamp,
                properties: e.properties,
                session_id: e.session_id,
            })),
        });
    }

    private async sendIdentify(
        distinctId: string,
        properties?: Record<string, unknown>
    ): Promise<void> {
        if (!this.config) return;

        try {
            await this.config.httpClient.post('/openclick/api/v1/identify', {
                api_key: this.config.apiKey,
                distinct_id: distinctId,
                properties: {
                    $set: properties || {},
                },
            });
        } catch (err) {
            console.warn('[OpenClick] Identify failed:', err);
        }
    }

    // ─────────────────────────────────────────────────────────────────────
    // Private: Event Handlers
    // ─────────────────────────────────────────────────────────────────────

    private handleBeforeUnload = (): void => {
        this.flushWithBeacon();
    };

    private handleVisibilityChange = (): void => {
        if (document.visibilityState === 'hidden') {
            this.flushWithBeacon();
        }
    };

    // keepalive: true lets the request outlive the page on unload/hide
    private flushWithBeacon(): void {
        if (!this.config || this.queue.length === 0) return;

        const events = [...this.queue];
        this.queue = [];

        this.config.httpClient.post('/openclick/api/v1/batch', {
            api_key: this.config.apiKey,
            batch: events.map((e) => ({
                event: e.event,
                distinct_id: e.distinct_id,
                timestamp: e.timestamp,
                properties: e.properties,
                session_id: e.session_id,
            })),
        }, { keepalive: true }).catch(() => {
            // Silently fail — we're unloading
        });
    }

    // ─────────────────────────────────────────────────────────────────────
    // Private: Auto-properties
    // ─────────────────────────────────────────────────────────────────────

    private getAutoProperties(): Record<string, unknown> {
        if (typeof window === 'undefined') return {};

        const ua = navigator.userAgent;

        return {
            $current_url: window.location.href,
            $pathname: window.location.pathname,
            $referrer: document.referrer || undefined,
            $screen_height: window.screen.height,
            $screen_width: window.screen.width,
            $viewport_height: window.innerHeight,
            $viewport_width: window.innerWidth,
            $browser: this.getBrowser(ua),
            $os: this.getOS(ua),
            $device_type: this.getDeviceType(),
            $lib: 'openclick-tsutils',
            $lib_version: '1.0.0',
        };
    }

    private getBrowser(ua: string): string {
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
        if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
        if (ua.includes('Edg')) return 'Edge';
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Safari')) return 'Safari';
        return 'Unknown';
    }

    private getOS(ua: string): string {
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac')) return 'macOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
        return 'Unknown';
    }

    private getDeviceType(): string {
        if (typeof window === 'undefined') return 'Unknown';
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    // ─────────────────────────────────────────────────────────────────────
    // Private: Identity Management
    // ─────────────────────────────────────────────────────────────────────

    private getOrCreateAnonId(): { id: string; isNew: boolean } {
        // Ensure the original anon id is written once and never overwritten
        let anon_id = LocalStorage.getItem<string>(ANON_ID_KEY);
        if (!anon_id) {
            anon_id = this.generateId();
            LocalStorage.setItem(ANON_ID_KEY, anon_id);
            return { id: anon_id, isNew: true };
        }

        // oc_anon_id may be the real user id if the user is already logged in
        return { id: anon_id, isNew: false };
    }

    private getUserId(): string | null {
        return LocalStorage.getItem<string>(USER_ID_KEY);
    }

    private setUserId(userId: string): void {
        LocalStorage.setItem(USER_ID_KEY, userId);
        this.userId = userId;
    }

    private getOrCreateSessionId(): string {
        if (typeof window === 'undefined') return this.generateId();

        const stored = sessionStorage.getItem(SESSION_ID_KEY);
        if (stored) return stored;

        const id = this.generateId();
        sessionStorage.setItem(SESSION_ID_KEY, id);
        return id;
    }

    private generateId(): string {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        // Fallback
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    // ─────────────────────────────────────────────────────────────────────
    // Private: Guards
    // ─────────────────────────────────────────────────────────────────────

    private isActive(): boolean {
        return this.initialized && !this.dntEnabled && this.config !== null;
    }
}

export const openClickService = OpenClickService.getInstance();
