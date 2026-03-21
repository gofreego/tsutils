/**
 * LocalStorage utility for safely storing and retrieving data
 */

export class LocalStorage {
  /**
   * Get an item from localStorage
   * @param key - The key to retrieve
   * @returns The value or null if not found or error occurs
   */
  static getItem<T = string>(key: string): T | null {
    try {
      if (typeof window === 'undefined') {
        return null
      }
      
      const item = window.localStorage.getItem(key)
      
      if (item === null) {
        return null
      }
      
      try {
        return JSON.parse(item) as T
      } catch {
        // If JSON parse fails, return as string
        return item as T
      }
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`)
      return null
    }
  }

  /**
   * Set an item in localStorage
   * @param key - The key to store
   * @param value - The value to store
   * @returns true if successful, false otherwise
   */
  static setItem<T>(key: string, value: T): boolean {
    try {
      if (typeof window === 'undefined') {
        return false
      }
      
      const serializedValue = typeof value === 'string' 
        ? value 
        : JSON.stringify(value)
      
      window.localStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`)
      return false
    }
  }

  /**
   * Remove an item from localStorage
   * @param key - The key to remove
   * @returns true if successful, false otherwise
   */
  static removeItem(key: string): boolean {
    try {
      if (typeof window === 'undefined') {
        return false
      }
      
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`)
      return false
    }
  }

  /**
   * Clear all items from localStorage
   * @returns true if successful, false otherwise
   */
  static clear(): boolean {
    try {
      if (typeof window === 'undefined') {
        return false
      }
      
      window.localStorage.clear()
      return true
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`)
      return false
    }
  }

  /**
   * Check if a key exists in localStorage
   * @param key - The key to check
   * @returns true if key exists, false otherwise
   */
  static hasItem(key: string): boolean {
    try {
      if (typeof window === 'undefined') {
        return false
      }
      
      return window.localStorage.getItem(key) !== null
    } catch (error) {
      console.error(`Error checking item in localStorage: ${error}`)
      return false
    }
  }

  /**
   * Get all keys from localStorage
   * @returns Array of keys
   */
  static keys(): string[] {
    try {
      if (typeof window === 'undefined') {
        return []
      }
      
      return Object.keys(window.localStorage)
    } catch (error) {
      console.error(`Error getting keys from localStorage: ${error}`)
      return []
    }
  }
}
