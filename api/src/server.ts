import cookieParser from 'cookie-parser'
import express from 'express'

import { config } from 'config.js'
import { AuthenticationController } from 'domains/authentication/index.js'
import { rootErrorsHandler } from 'errors/index.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(AuthenticationController)
app.use('/ping', (_req, res) => {
  res.send('pong ' + Date.now())
})

app.use(rootErrorsHandler)

app.listen(config.port, () => {
  console.log(`App running @ http://::${config.port}`)
})
