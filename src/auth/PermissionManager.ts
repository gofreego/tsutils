const PERMISSIONS_STORAGE_KEY = 'auth_permissions'

/**
 * A utility class to manage user permissions using the browser's localStorage.
 * Employs an internal memory cache to prevent repeated synchronous parsing.
 */
export class PermissionManager {
    private static cachedPermissions: Set<string> | null = null

    /**
     * Saves an array of permission strings to local storage.
     * @param permissions Array of permission strings.
     */
    public static setPermissions(permissions: string[]): void {
        this.cachedPermissions = new Set(permissions) // Refresh cache as Set

        if (typeof window === 'undefined') return
        try {
            localStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(permissions))
        } catch (error) {
            console.error('Failed to save permissions to localStorage', error)
        }
    }

    /**
     * Retrieves the currently stored permissions from local storage or memory cache.
     * @returns Array of permission strings, or an empty array if none exist.
     */
    public static getPermissions(): string[] {
        // Return from memory if previously resolved
        if (this.cachedPermissions !== null) {
            return Array.from(this.cachedPermissions)
        }

        if (typeof window === 'undefined') return []

        try {
            const stored = localStorage.getItem(PERMISSIONS_STORAGE_KEY)

            if (!stored) {
                this.cachedPermissions = new Set()
                return []
            }

            const parsed = JSON.parse(stored)
            const permissionsArray = Array.isArray(parsed) ? parsed : []

            this.cachedPermissions = new Set(permissionsArray)
            return permissionsArray

        } catch (error) {
            console.error('Failed to parse permissions from localStorage', error)
            this.cachedPermissions = new Set()
            return []
        }
    }

    /**
     * Clears all stored permissions from memory and local storage.
     */
    public static clearPermissions(): void {
        this.cachedPermissions = null // Clear cache

        if (typeof window === 'undefined') return
        localStorage.removeItem(PERMISSIONS_STORAGE_KEY)
    }

    /**
     * Checks whether the given permission string exists in the currently stored permissions.
     * @param permission The permission string to check for.
     * @returns True if the permission exists, false otherwise.
     */
    public static hasPermission(permission: string): boolean {
        // Automatically warm up the cache if empty
        if (this.cachedPermissions === null) {
            this.getPermissions()
        }

        // Instant O(1) hash lookup rather than O(N) array scan
        return this.cachedPermissions!.has(permission)
    }
}
