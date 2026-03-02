import cookieParser from 'cookie-parser'
import express from 'express'
import 'reflect-metadata'

import { config } from 'config.js'

import { requestEntityManagerMiddleware } from './db/index.js'
import { rootErrorsHandler } from './errors/index.js'
import { loggerMiddleware } from './logger.js'
import ApiRouter from './routes/api.js'

const app = express()

app.use(loggerMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use(requestEntityManagerMiddleware)

app.use('/api', ApiRouter)

app.use(rootErrorsHandler)

app.listen(config.port, () => {
  console.log(`App running @ http://::${config.port}`)
})
