import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

/** Helper to extract cookie value by name */
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

/** Helper to securely decode a JWT payload without external libraries */
function decodeJWT(token: string) {
    try {
        const base64Url = token.split('.')[1]
        if (!base64Url) return null
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

        // Properly handle unicode characters in JWT
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join('')
        )

        return JSON.parse(jsonPayload)
    } catch (e) {
        return null
    }
}

/** 
 * Context State Interface 
 */
export interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
})

export interface AuthProviderProps {
    /** Name of the cookie containing the JWT token. Defaults to "authorization" */
    cookieName?: string
    /** URL to redirect the user to if authentication fails */
    redirectUrl: string
    /** Components to render if deeply authenticated */
    children: ReactNode
    /** Custom fallback logic to fire upon failed auth (overrides redirectUrl behavior) */
    onAuthFail?: () => void
    /** Custom callback fired strictly on successful auth */
    onAuthSuccess?: () => void
    /** Optional loading element while checking cookies asynchronously */
    loadingElement?: ReactNode
}

/**
 * AuthProvider verifies a JWT embedded in document.cookie.
 * Checks for existence, decodes the signature, and evaluates the `exp` claim.
 * Redirects heavily dependent or kicks custom callbacks if failed.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({
    cookieName = 'authorization',
    redirectUrl,
    children,
    onAuthFail,
    onAuthSuccess,
    loadingElement = null
}) => {
    const [authState, setAuthState] = useState<AuthContextType>({
        isAuthenticated: false,
        isLoading: true, // starts loading until cookie check completes
    })

    // Prevent endless redirection loop if it fails and redirects to a React Router page using AuthProvider
    const [authFailed, setAuthFailed] = useState(false)

    useEffect(() => {
        // Only parse auth once on mount or explicitly requested
        const verifyAuth = () => {
            const token = getCookie(cookieName)

            if (!token) {
                handleFail()
                return
            }

            const decoded = decodeJWT(token)

            if (!decoded) {
                handleFail()
                return
            }

            // Check standard JWT numeric expiration date ('exp' claim)
            if (decoded.exp) {
                // JWT `exp` is issued in seconds, convert to JS Date milliseconds
                const expirationDate = new Date(decoded.exp * 1000)
                if (expirationDate < new Date()) {
                    handleFail() // Token expired
                    return
                }
            }

            // Token passed validation
            setAuthState({
                isAuthenticated: true,
                isLoading: false,
            })

            if (onAuthSuccess) {
                onAuthSuccess()
            }
        }

        verifyAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookieName])

    const handleFail = () => {
        setAuthState({
            isAuthenticated: false,
            isLoading: false,
        })
        setAuthFailed(true)

        if (onAuthFail) {
            onAuthFail()
        } else if (redirectUrl && typeof window !== 'undefined') {
            window.location.href = redirectUrl
        }
    }

    // If we are currently loading, or we failed and are actively redirecting via `window.location`,
    // wait and render loading element rather than revealing protected children.
    if (authState.isLoading || (authFailed && !onAuthFail)) {
        return <>{loadingElement}</>
    }

    // Custom failure triggers might still render children depending on dev implementation
    if (authFailed && onAuthFail) {
        return <>{children}</>
    }

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    )
}

/**
 * React Hook for easily accessing the authenticated JWT context
 */
export const useAuth = (): AuthContextType => {
    return useContext(AuthContext)
}
