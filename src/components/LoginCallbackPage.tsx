import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { extractErrorMessage } from '../http'
import { useTheme } from '../theme'
import type { IAuthService } from '../auth'

export interface LoginCallbackPageProps {
  authService: IAuthService
  navigateTo?: string
}

export function LoginCallbackPage({ authService, navigateTo = '/' }: LoginCallbackPageProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loginToken = searchParams.get('login_token')

    if (!loginToken) {
      console.error('Login callback failed: Missing login_token in query parameters')
      setError('Login failed: missing login token.')
      return
    }
    authService
      .signInWithLoginToken({ loginToken, includePermissions: true })
      .then(() => {
        navigate(navigateTo, { replace: true })
      })
      .catch((err: unknown) => {
        const message = extractErrorMessage(err)
        console.error('Login callback failed:', message)
        setError(message)
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
      {error ? (
        <>
          <Typography variant="body1" sx={{ color: theme.colors.surface, fontWeight: 500 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(navigateTo, { replace: true })}
            sx={{
              backgroundColor: theme.colors.surface,
              color: theme.colors.primary,
              '&:hover': { backgroundColor: theme.colors.surface, opacity: 0.9 },
            }}
          >
            Retry
          </Button>
        </>
      ) : (
        <>
          <CircularProgress sx={{ color: theme.colors.surface }} />
          <Typography variant="body2" sx={{ color: theme.colors.surface, opacity: 0.85 }}>
            Signing you in…
          </Typography>
        </>
      )}
    </Box>
  )
}
