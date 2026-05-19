import type { ReactElement } from 'react'
import type { ISessionManager } from '../auth'

export interface ProtectedRouteProps {
  children: ReactElement
  sessionManager: ISessionManager
  loginUrl: string
  callbackPath?: string
}

export function ProtectedRoute({ children, sessionManager, loginUrl, callbackPath = '/login-callback' }: ProtectedRouteProps) {
  if (!sessionManager.isAuthenticated()) {
    const callbackUrl = `${window.location.origin}${callbackPath}`
    try {
      const url = new URL(loginUrl)
      url.searchParams.set('redirect', callbackUrl)
      window.location.href = url.toString()
    } catch {
      window.location.href = loginUrl
    }
    return null
  }
  return children
}
