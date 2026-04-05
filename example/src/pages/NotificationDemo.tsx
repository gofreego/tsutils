import { Box, Typography, Paper, Button, Stack, Card, CardContent, TextField, Grid } from '@mui/material'
import { useNotification } from '@gofreego/tsutils'
import { CheckCircleOutline, ErrorOutline, WarningAmber, InfoOutlined } from '@mui/icons-material'
import { useState } from 'react'

export default function NotificationDemo() {
  const { success, error, warning, info } = useNotification()
  const [customMessage, setCustomMessage] = useState('Custom notification message')
  const [customDuration, setCustomDuration] = useState(6000)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
        Notification Provider Demo
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Test toast notifications with different severity levels
      </Typography>

      {/* Basic Notification Types */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notification Types
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Click buttons to trigger different notification types
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <CheckCircleOutline sx={{ fontSize: 48, color: 'success.main' }} />
                  <Typography variant="h6" textAlign="center">
                    Success
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => success('Operation completed successfully!')}
                  >
                    Show Success
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <ErrorOutline sx={{ fontSize: 48, color: 'error.main' }} />
                  <Typography variant="h6" textAlign="center">
                    Error
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => error('Something went wrong!')}
                  >
                    Show Error
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <WarningAmber sx={{ fontSize: 48, color: 'warning.main' }} />
                  <Typography variant="h6" textAlign="center">
                    Warning
                  </Typography>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={() => warning('Please proceed with caution!')}
                  >
                    Show Warning
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <InfoOutlined sx={{ fontSize: 48, color: 'info.main' }} />
                  <Typography variant="h6" textAlign="center">
                    Info
                  </Typography>
                  <Button
                    variant="contained"
                    color="info"
                    fullWidth
                    onClick={() => info('Here is some helpful information')}
                  >
                    Show Info
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Custom Duration */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Custom Duration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Control how long notifications stay visible
        </Typography>
        
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button
            variant="outlined"
            onClick={() => success('Quick notification (2s)', 2000)}
          >
            Quick (2s)
          </Button>
          <Button
            variant="outlined"
            onClick={() => info('Normal notification (6s)', 6000)}
          >
            Normal (6s)
          </Button>
          <Button
            variant="outlined"
            onClick={() => error('Long notification (10s) - Read carefully!', 10000)}
          >
            Long (10s)
          </Button>
        </Stack>
      </Paper>

      {/* Multiple Notifications */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Multiple Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Test notification stacking with multiple messages
        </Typography>
        
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button
            variant="outlined"
            onClick={() => {
              success('First notification')
              setTimeout(() => info('Second notification'), 300)
              setTimeout(() => warning('Third notification'), 600)
            }}
          >
            Show 3 Notifications
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              for (let i = 1; i <= 5; i++) {
                setTimeout(() => info(`Notification ${i}`), i * 200)
              }
            }}
          >
            Spam 5 Notifications
          </Button>
        </Stack>
      </Paper>

      {/* Event Simulation */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Event-Based Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Simulate real-world scenarios
        </Typography>
        
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button
            variant="outlined"
            onClick={() => {
              info('Saving data...')
              setTimeout(() => success('Data saved successfully!'), 1500)
            }}
          >
            Simulate Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              info('Processing request...')
              setTimeout(() => error('Failed to process request'), 2000)
            }}
          >
            Simulate Error
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              info('Loading...')
              setTimeout(() => warning('Operation took longer than expected'), 1500)
              setTimeout(() => success('Completed!'), 3000)
            }}
          >
            Simulate Process
          </Button>
        </Stack>
      </Paper>

      {/* Custom Message */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Custom Message & Duration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Create your own notification
        </Typography>
        
        <Stack spacing={2}>
          <TextField
            label="Message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            fullWidth
          />
          <TextField
            label="Duration (ms)"
            type="number"
            value={customDuration}
            onChange={(e) => setCustomDuration(parseInt(e.target.value) || 6000)}
            fullWidth
          />
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              color="success"
              onClick={() => success(customMessage, customDuration)}
            >
              Success
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => error(customMessage, customDuration)}
            >
              Error
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => warning(customMessage, customDuration)}
            >
              Warning
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => info(customMessage, customDuration)}
            >
              Info
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Usage Code Example */}
      <Paper elevation={2} sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Usage Example
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 2,
            bgcolor: 'grey.900',
            color: 'grey.100',
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem',
          }}
        >
          {`import { useNotification } from '@gofreego/tsutils'

function MyComponent() {
  const { success, error, warning, info } = useNotification()

  const handleSave = async () => {
    try {
      await saveData()
      success('Data saved successfully!')
    } catch (err) {
      error('Failed to save data')
    }
  }

  return (
    <button onClick={handleSave}>Save</button>
  )
}`}
        </Box>
      </Paper>
    </Box>
  )
}
