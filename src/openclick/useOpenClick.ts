import { openClickService } from './openClickService'

/**
 * Convenient hook for tracking events from any component.
 *
 * Usage:
 *   const { capture } = useOpenClick()
 *   capture('button_clicked', { label: 'Upgrade' })
 */
export function useOpenClick() {
    return {
        capture: (event: string, properties?: Record<string, unknown>) => {
            openClickService.capture(event, properties)
        }
    }
}
