import { Box, Typography, Paper, Button, Stack, Card, CardContent } from '@mui/material'
import { useTheme, ThemeToggle } from '@gofreego/tsutils'
import { Brightness4, Brightness7, BrightnessAuto } from '@mui/icons-material'

export default function ThemeDemo() {
  const { theme, themeMode, resolvedThemeMode, setThemeMode } = useTheme()

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Theme System Demo
        </Typography>
        <ThemeToggle />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Test the theme system with light, dark, and system modes
      </Typography>

      {/* Current Theme Status */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Theme Status
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Theme Mode:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {themeMode}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Resolved Mode (Actual):
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {resolvedThemeMode}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Theme Controls */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Theme Controls
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant={themeMode === 'light' ? 'contained' : 'outlined'}
            startIcon={<Brightness7 />}
            onClick={() => setThemeMode('light')}
          >
            Light
          </Button>
          <Button
            variant={themeMode === 'dark' ? 'contained' : 'outlined'}
            startIcon={<Brightness4 />}
            onClick={() => setThemeMode('dark')}
          >
            Dark
          </Button>
          <Button
            variant={themeMode === 'system' ? 'contained' : 'outlined'}
            startIcon={<BrightnessAuto />}
            onClick={() => setThemeMode('system')}
          >
            System
          </Button>
        </Stack>
      </Paper>

      {/* Color Palette */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Color Palette
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Current theme colors (using CSS variables)
        </Typography>
        
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: 'var(--color-primary)',
                borderRadius: 1,
                border: '2px solid',
                borderColor: 'divider',
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight="medium">
                Primary
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {theme.colors.primary}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: 'var(--color-background)',
                borderRadius: 1,
                border: '2px solid',
                borderColor: 'divider',
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight="medium">
                Background
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {theme.colors.background}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: 'var(--color-success)',
                borderRadius: 1,
                border: '2px solid',
                borderColor: 'divider',
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight="medium">
                Success
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {theme.colors.success}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: 'var(--color-error)',
                borderRadius: 1,
                border: '2px solid',
                borderColor: 'divider',
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight="medium">
                Error
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {theme.colors.error}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* CSS Variables Demo */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          CSS Variables in Action
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          These elements use CSS variables that automatically update with the theme
        </Typography>

        <Stack spacing={2}>
          <Card
            sx={{
              backgroundColor: 'var(--color-background-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <CardContent>
              <Typography style={{ color: 'var(--color-text)' }}>
                Background Secondary + Border
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: 'var(--color-success-background)',
              border: '1px solid var(--color-success)',
            }}
          >
            <CardContent>
              <Typography style={{ color: 'var(--color-success)' }}>
                Success Colors
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: 'var(--color-error-background)',
              border: '1px solid var(--color-error)',
            }}
          >
            <CardContent>
              <Typography style={{ color: 'var(--color-error)' }}>
                Error Colors
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Paper>
    </Box>
  )
}
