import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { config } from 'config.js'
import { AuthenticationController } from 'domains/authentication/index.js'
import { rootErrorsHandler } from 'errors/index.js'

const app = express()

app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'))
app.use(cors({ origin: config.apiAllowedOrigins, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use(AuthenticationController)
app.post('/ping', (_req, res) => {
  res.send('pong - ' + Date.now())
})

app.use(rootErrorsHandler)

app.listen(config.port, () => {
  console.log(`App running @ http://::${config.port}`)
})
