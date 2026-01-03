import type { FC } from 'react'
import { Navigate, Outlet } from 'react-router'

import { getAccessTokenFromLs } from '@/utils/local-storage'

const PrivateRouteLayout: FC = () => {
  const accessToken = getAccessTokenFromLs()
  if (typeof accessToken !== 'string') return <Navigate to="/sign-in" replace />
  return <Outlet />
}

export default PrivateRouteLayout
