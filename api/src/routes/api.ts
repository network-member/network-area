import cors from 'cors'
import express from 'express'

import { config } from 'config.js'
import { AuthenticationController, authenticate } from 'domains/authentication/index.js'

const router = express.Router()

router.use(cors({ origin: config.apiAllowedOrigins, credentials: true }))
router.use(AuthenticationController)

router.use('/', authenticate)

router.post('/ping', (_req, res) => {
  res.send('pong - ' + new Date().toISOString())
})

export default router
