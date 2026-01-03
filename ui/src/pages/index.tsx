import type { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import LoginLayout from '@/components/LoginLayout'
import PrivateRouteLayout from '@/components/PrivateRouteLayout'

import Main from './Main'
import SignIn from './SignIn'
import SignUp from './SignUp'

const ApplicationRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouteLayout />}>
          <Route path="/" element={<Main />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default ApplicationRouter
