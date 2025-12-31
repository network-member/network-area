import express from 'express'

import authenticate from './authenticate.middleware.js'
import {
  handleLoginAttempt,
  handleLogoutAllAttempt,
  handleLogoutAttempt,
  handleRefreshTokenAttempt,
} from './controller.service.js'

const router = express.Router()

router.post('/auth', handleLoginAttempt)

router.post('/auth/session/logout', handleLogoutAttempt)

router.post('/auth/session/refresh', handleRefreshTokenAttempt)

router.post('/auth/logout-all', handleLogoutAllAttempt)

router.use('/', authenticate)

export default router
