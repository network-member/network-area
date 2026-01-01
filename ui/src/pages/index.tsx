import type { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import LoginLayout from '../components/LoginLayout'
import SignIn from './SignIn'
import SignUp from './SignUp'

const ApplicationRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default ApplicationRouter
