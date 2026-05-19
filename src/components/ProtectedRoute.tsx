import type { ReactElement } from 'react'
import type { ISessionManager } from '../auth'

export interface ProtectedRouteProps {
  children: ReactElement
  sessionManager: ISessionManager
  loginUrl: string
}

export function ProtectedRoute({ children, sessionManager, loginUrl }: ProtectedRouteProps) {
  if (!sessionManager.isAuthenticated()) {
    const callbackUrl = `${window.location.origin}/login-callback`
    const url = new URL(loginUrl)
    url.searchParams.set('redirect', callbackUrl)
    window.location.href = url.toString()
    return null
  }
  return children
}
