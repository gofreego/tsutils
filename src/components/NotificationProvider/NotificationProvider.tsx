import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

/**
 * Notification type representing a toast message
 */
export interface Notification {
    id: string
    message: string
    type: AlertColor
    duration?: number
}

/**
 * Context interface for notification management
 */
export interface NotificationContextType {
    showNotification: (message: string, type: AlertColor, duration?: number) => void
    success: (message: string, duration?: number) => void
    error: (message: string, duration?: number) => void
    warning: (message: string, duration?: number) => void
    info: (message: string, duration?: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export interface NotificationProviderProps {
    /** Components to wrap with notification context */
    children: ReactNode
    /** Default duration for notifications in milliseconds. Defaults to 6000ms */
    defaultDuration?: number
    /** Maximum number of notifications to show at once. Defaults to 3 */
    maxNotifications?: number
    /** Position of the notifications. Defaults to top-right */
    anchorOrigin?: {
        vertical: 'top' | 'bottom'
        horizontal: 'left' | 'center' | 'right'
    }
}

/**
 * NotificationProvider manages toast notifications using Material-UI Snackbar and Alert.
 * Provides methods to show success, error, warning, and info notifications.
 * 
 * @example
 * ```tsx
 * <NotificationProvider>
 *   <App />
 * </NotificationProvider>
 * ```
 * 
 * // In a component:
 * ```tsx
 * const { success, error } = useNotification()
 * success('Operation completed!')
 * error('Something went wrong')
 * ```
 */
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
    children,
    defaultDuration = 6000,
    maxNotifications = 3,
    anchorOrigin = { vertical: 'top', horizontal: 'right' }
}) => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const showNotification = useCallback((
        message: string,
        type: AlertColor,
        duration: number = defaultDuration
    ) => {
        const id = `${Date.now()}-${Math.random()}`
        const newNotification: Notification = { id, message, type, duration }

        setNotifications((prev) => {
            // Limit the number of notifications
            const updated = [...prev, newNotification]
            if (updated.length > maxNotifications) {
                return updated.slice(updated.length - maxNotifications)
            }
            return updated
        })
    }, [defaultDuration, maxNotifications])

    const handleClose = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    }, [])

    const success = useCallback((message: string, duration?: number) => {
        showNotification(message, 'success', duration)
    }, [showNotification])

    const error = useCallback((message: string, duration?: number) => {
        showNotification(message, 'error', duration)
    }, [showNotification])

    const warning = useCallback((message: string, duration?: number) => {
        showNotification(message, 'warning', duration)
    }, [showNotification])

    const info = useCallback((message: string, duration?: number) => {
        showNotification(message, 'info', duration)
    }, [showNotification])

    const contextValue: NotificationContextType = {
        showNotification,
        success,
        error,
        warning,
        info
    }

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            {notifications.map((notification, index) => (
                <Snackbar
                    key={notification.id}
                    open={true}
                    autoHideDuration={notification.duration}
                    onClose={() => handleClose(notification.id)}
                    anchorOrigin={anchorOrigin}
                    style={{
                        marginTop: index * 70 // Stack notifications vertically
                    }}
                >
                    <Alert
                        onClose={() => handleClose(notification.id)}
                        severity={notification.type}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </NotificationContext.Provider>
    )
}

/**
 * Hook to access notification context
 * Must be used within a NotificationProvider
 * 
 * @example
 * ```tsx
 * const { success, error, warning, info } = useNotification()
 * 
 * // Show notifications
 * success('Data saved successfully!')
 * error('Failed to save data')
 * warning('This action cannot be undone')
 * info('New update available')
 * 
 * // With custom duration
 * success('Quick message', 3000)
 * ```
 */
export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}
