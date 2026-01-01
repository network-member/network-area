import type { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router'

import { Card, SignUpContainer } from './styled'

const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SignUpContainer>
      <Card variant="outlined">
        <Outlet />
      </Card>
    </SignUpContainer>
  )
}

export default LoginLayout
