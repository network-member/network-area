import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { ApiError } from './constants.js'

export default function rootErrorsHandler(err: Error, _req: Request, res: Response, _next: NextFunction): Response {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).send({ error: err.message })
  }

  console.error(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
}
