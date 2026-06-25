import { useEffect, useRef, ReactNode } from 'react'
import { openClickService, OpenClickConfig } from './openClickService'

export interface OpenClickProviderProps extends Omit<OpenClickConfig, 'capturePageviews'> {
    /** Current route pathname — pass from your router (e.g. Next.js usePathname, React Router useLocation) */
    pathname: string
    children?: ReactNode
}


/**
 * Framework-agnostic OpenClick provider.
 * Initializes the analytics service and auto-captures pageviews on pathname changes.
 * Pass `pathname` from your router so this works with any React framework.
 *
 * For user identification, call openClickService.identify() / openClickService.reset() directly.
 */
export function OpenClickProvider({
    apiKey,
    httpClient,
    pathname,
    batchSize,
    flushIntervalMs,
    respectDNT,
    children = null,
}: OpenClickProviderProps) {
    const isInitialized = useRef(false)
    const prevPathname = useRef<string | null>(null)

    useEffect(() => {
        if (isInitialized.current) return
        isInitialized.current = true

        openClickService.init({ apiKey, httpClient, batchSize, flushIntervalMs, respectDNT })

        return () => {
            openClickService.destroy()
        }
    }, [])

    useEffect(() => {
        if (prevPathname.current === null) {
            prevPathname.current = pathname
            openClickService.capturePageview(
                typeof window !== 'undefined' ? window.location.origin + pathname : pathname
            )
            return
        }

        if (pathname !== prevPathname.current) {
            prevPathname.current = pathname
            openClickService.capturePageview(
                typeof window !== 'undefined' ? window.location.origin + pathname : pathname
            )
        }
    }, [pathname])

    return <>{children}</>
}
