import { useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { extractErrorMessage } from '../http'
import { useTheme } from '../theme'
import type { IAuthService } from '../auth'

export interface LoginCallbackPageProps {
  authService: IAuthService
  navigateTo?: string
  onLoginFailed?: () => void
}

export function LoginCallbackPage({ authService, navigateTo = '/', onLoginFailed }: LoginCallbackPageProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { theme } = useTheme()

  useEffect(() => {
    const loginToken = searchParams.get('login_token')

    if (!loginToken) {
      console.error('Login callback failed: Missing login_token in query parameters')
      onLoginFailed?.()
      return
    }
    authService
      .signInWithLoginToken({ loginToken, includePermissions: true })
      .then(() => {
        navigate(navigateTo, { replace: true })
      })
      .catch((err: unknown) => {
        console.error('Login callback failed:', extractErrorMessage(err))
        onLoginFailed?.()
      })
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryActive} 100%)`,
        gap: 2,
      }}
    >
      <CircularProgress sx={{ color: theme.colors.surface }} />
      <Typography variant="body2" sx={{ color: theme.colors.surface, opacity: 0.85 }}>
        Signing you in…
      </Typography>
    </Box>
  )
}
