import { useEffect } from 'react'

const useUpdatePageTitle = (title: string): void => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default useUpdatePageTitle
