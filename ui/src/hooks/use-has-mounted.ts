import { useEffect, useState } from 'react'

export const useHasMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!isMounted) setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [isMounted])

  return isMounted
}
