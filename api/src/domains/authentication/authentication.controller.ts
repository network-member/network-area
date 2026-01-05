import express from 'express'

import authenticate from './authenticate.middleware.js'
import {
  handleLoginAttempt,
  handleLogoutAllAttempt,
  handleLogoutAttempt,
  handleRefreshTokenAttempt,
  handleSignUp,
} from './controller.service.js'

const router = express.Router()

//  curl -X POST -H "Content-Type: application/json" -d '{"email":"admin@mail.ru","password":"admin"}' http://localhost:3000/auth --verbose
router.post('/auth', handleLoginAttempt)

//  curl -X POST -H "Content-Type: application/json" -d '{"email":"admin@mail.ru", "firstName": "John", "lastName": "Snow", "password":"admin123", "passwordConfirmation":"admin123"}' http://localhost:3000/sign-up --verbose
router.post('/sign-up', handleSignUp)

router.post('/auth/session/logout', handleLogoutAttempt)

router.post('/auth/session/refresh', handleRefreshTokenAttempt)

router.post('/auth/logout-all', handleLogoutAllAttempt)

router.use('/', authenticate)

export default router
