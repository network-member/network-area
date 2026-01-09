import { lazy } from 'react'
import type { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import LoginLayout from '@/components/LoginLayout'
import PrivateRouteLayout from '@/components/PrivateRouteLayout'

const MainPage = lazy(async () => await import('./Main'))
const SignInPage = lazy(async () => await import('./SignIn'))
const SignUpPage = lazy(async () => await import('./SignUp'))

const ApplicationRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouteLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default ApplicationRouter
