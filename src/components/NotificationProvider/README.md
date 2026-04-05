# NotificationProvider

A React context-based notification system for displaying toast messages with different severity levels.

## Features

- ✅ **Multiple notification types**: success, error, warning, info
- ✅ **Auto-dismiss**: Configurable duration for each notification
- ✅ **Stack notifications**: Display multiple notifications at once with smart stacking
- ✅ **Customizable positioning**: Control where notifications appear
- ✅ **Built with Material-UI**: Uses MUI's Snackbar and Alert components
- ✅ **TypeScript support**: Full type safety

## Installation

The NotificationProvider is part of `@gofreego/tsutils`. Make sure you have the required peer dependencies:

```bash
npm install @gofreego/tsutils @mui/material @emotion/react @emotion/styled
```

## Basic Usage

### 1. Wrap your app with NotificationProvider

```tsx
import { NotificationProvider } from '@gofreego/tsutils'

function App() {
  return (
    <NotificationProvider>
      <YourApp />
    </NotificationProvider>
  )
}
```

### 2. Use the hook in your components

```tsx
import { useNotification } from '@gofreego/tsutils'

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
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => warning('Are you sure?')}>Delete</button>
      <button onClick={() => info('New feature available')}>Info</button>
    </div>
  )
}
```

## API

### NotificationProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Components to wrap with notification context |
| `defaultDuration` | `number` | `6000` | Default duration for notifications in milliseconds |
| `maxNotifications` | `number` | `3` | Maximum number of notifications to show at once |
| `anchorOrigin` | `object` | `{ vertical: 'top', horizontal: 'right' }` | Position of notifications |

### useNotification Hook

Returns an object with the following methods:

- **`success(message: string, duration?: number)`** - Show a success notification (green)
- **`error(message: string, duration?: number)`** - Show an error notification (red)
- **`warning(message: string, duration?: number)`** - Show a warning notification (orange)
- **`info(message: string, duration?: number)`** - Show an info notification (blue)
- **`showNotification(message: string, type: AlertColor, duration?: number)`** - Generic method for custom notifications

## Advanced Examples

### Custom Duration

```tsx
const { success, error } = useNotification()

// Quick 3-second notification
success('Quick toast!', 3000)

// Longer 10-second notification  
error('Critical error - read carefully', 10000)
```

### Custom Position

```tsx
<NotificationProvider 
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <App />
</NotificationProvider>
```

### Limit Max Notifications

```tsx
<NotificationProvider maxNotifications={1}>
  <App />
</NotificationProvider>
```

### Event-Based Notifications

```tsx
function OrderTracker() {
  const { success, info, error } = useNotification()

  useEffect(() => {
    const socket = new WebSocket('ws://...')
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      switch (data.type) {
        case 'order_placed':
          success('Order placed successfully!')
          break
        case 'order_shipped':
          info('Your order has been shipped')
          break
        case 'order_failed':
          error('Order processing failed')
          break
      }
    }
    
    return () => socket.close()
  }, [success, info, error])

  return <div>Order Status</div>
}
```

### Form Validation

```tsx
function LoginForm() {
  const { error, success } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      error('Email is required')
      return
    }
    
    if (!password) {
      error('Password is required')
      return
    }
    
    try {
      await login(email, password)
      success('Login successful!')
    } catch (err) {
      error('Invalid credentials')
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

## TypeScript Types

```tsx
import { 
  NotificationProvider, 
  useNotification,
  type NotificationProviderProps,
  type NotificationContextType,
  type Notification
} from '@gofreego/tsutils'

// Notification type
interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

// Context type
interface NotificationContextType {
  showNotification: (message: string, type: AlertColor, duration?: number) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}
```

## Notes

- Notifications automatically dismiss after the specified duration
- Users can manually dismiss notifications by clicking the close button
- When max notification limit is reached, older notifications are removed
- Each notification type uses Material-UI's standard color scheme
