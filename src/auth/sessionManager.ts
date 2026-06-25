import { LocalStorage } from  "../utils";
import { HttpClient } from '../http'
import type { SignInResponse } from './struct'

const SESSION_KEY = 'session_details'

export interface ISessionManager {
    /** Persist session to localStorage and set the auth header. */
    save(session: SignInResponse): void
    /** Partially update stored session fields (e.g. after token refresh). */
    patch(updates: Partial<SignInResponse>): void
    /** Clear session from localStorage and remove the auth header. */
    clear(): void
    /** Return the full stored session, or null if absent / unparseable. */
    get(): SignInResponse | null
    /** Return the stored access token, or undefined. */
    getAccessToken(): string | undefined
    /** Return the stored refresh token, or undefined. */
    getRefreshToken(): string | undefined
    /** Return the session UUID, or undefined. */
    getSessionId(): string | undefined
    /** True when a non-expired access token is stored. */
    isAuthenticated(): boolean
}

export class SessionManager implements ISessionManager {
    private static instance: SessionManager
    private readonly key: string
    // private readonly client: HttpClient
    private cache: SignInResponse | null = null

    private constructor(key = SESSION_KEY) {
        // this.client = client
        this.key = key
    }

    static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager()
        }
        return SessionManager.instance
    }

    save(session: SignInResponse): void {
        this.cache = session
        LocalStorage.setItem(this.key, session)
    }

    patch(updates: Partial<SignInResponse>): void {
        const current = this.get()
        if (!current) return
        const updated = { ...current, ...updates }
        this.cache = updated
        LocalStorage.setItem(this.key, updated)
    }

    clear(): void {
        this.cache = null
        LocalStorage.removeItem(this.key)
    }

    get(): SignInResponse | null {
        if (this.cache !== null) return this.cache
        this.cache = LocalStorage.getItem<SignInResponse>(this.key)
        return this.cache
    }

    getAccessToken(): string | undefined {
        return this.get()?.accessToken || undefined
    }

    getRefreshToken(): string | undefined {
        return this.get()?.refreshToken || undefined
    }

    getSessionId(): string | undefined {
        return this.get()?.sessionId || undefined
    }

    isAuthenticated(): boolean {
        const session = this.get()
        if (!session?.accessToken) return false
        return Number(session.expiresAt) > Date.now() / 1000
    }

    getUserUUID(): string | undefined {
        return this.get()?.user?.uuid || undefined
    }

}
