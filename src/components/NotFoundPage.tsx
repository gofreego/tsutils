import { Box, Typography, Button } from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../theme'

export function NotFoundPage() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.backgroundSecondary,
        gap: 2,
        textAlign: 'center',
        px: 2,
      }}
    >
      <SentimentDissatisfied sx={{ fontSize: 72, color: 'text.disabled' }} />
      <Typography variant="h2" fontWeight="bold" color="text.primary">
        404
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Page not found
      </Typography>
      <Typography variant="body2" color="text.disabled" sx={{ maxWidth: 360 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, textTransform: 'none' }}
        onClick={() => navigate('/', { replace: true })}
      >
        Go to Home
      </Button>
    </Box>
  )
}
