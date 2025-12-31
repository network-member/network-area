import type { NextFunction, Request, Response } from 'express'

import JwtAuthService from './jwt-auth.service.js'

export default function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const { userId } = JwtAuthService.authenticate(req)
  req.usersId = userId
  next()
}
