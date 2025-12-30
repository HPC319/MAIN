/**
 * useMounted Hook
 * 
 * Hook to detect if component is mounted on the client
 * Useful for preventing hydration mismatches in SSR
 */

'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true after component mounts on client
 * 
 * Prevents hydration mismatches by ensuring client-only code
 * runs only after hydration is complete
 * 
 * @returns boolean indicating if component is mounted
 * 
 * @example
 * const mounted = useMounted()
 * 
 * if (!mounted) return null // or return skeleton
 * 
 * return <ClientOnlyComponent />
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

/**
 * Alternative implementation that returns the mounted state
 * and a ref to check if component is still mounted
 */
export function useMountedState() {
  const [mounted, setMounted] = useState(false)
  const [isMountedRef, setIsMountedRef] = useState({ current: false })

  useEffect(() => {
    setMounted(true)
    setIsMountedRef({ current: true })

    return () => {
      setIsMountedRef({ current: false })
    }
  }, [])

  return { mounted, isMountedRef: isMountedRef.current }
}

/**
 * Hook that returns a function to check if component is mounted
 * Useful for async operations
 */
export function useIsMounted(): () => boolean {
  const mountedRef = useState({ current: false })[0]

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [mountedRef])

  return () => mountedRef.current
}
