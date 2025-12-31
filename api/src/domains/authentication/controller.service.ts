import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Zod from 'zod'

import { UserService } from 'domains/user/index.js'
import { UnauthorizedApiError, validateApiRoutePayload } from 'errors/index.js'

import JwtAuthService, { RefreshTokenCookieName, RefreshTokenTTL } from './jwt-auth.service.js'

const authPayloadValidationSchema = Zod.object({ email: Zod.email(), password: Zod.string().min(1) })

const refreshTokenCookiePayload = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: RefreshTokenTTL * 1000,
  path: '/auth/session',
} as const

export async function handleLoginAttempt(req: Request, res: Response): Promise<Response> {
  const payload = validateApiRoutePayload(req.body, authPayloadValidationSchema)
  const user = await UserService.getUserByCredentials(payload)

  if (user === null) throw new UnauthorizedApiError()

  const { accessToken, refreshToken } = await JwtAuthService.createTokensPair(req, { userId: user.id })
  res.cookie(RefreshTokenCookieName, refreshToken, refreshTokenCookiePayload)

  return res.status(StatusCodes.OK).send({ accessToken })
}

export async function handleRefreshTokenAttempt(req: Request, res: Response): Promise<Response> {
  const accessToken = await JwtAuthService.refreshToken(req)
  return res.status(StatusCodes.OK).send({ accessToken })
}

export async function handleLogoutAttempt(req: Request, res: Response): Promise<Response> {
  await JwtAuthService.closeSession(req)
  res.clearCookie(RefreshTokenCookieName, refreshTokenCookiePayload)
  return res.sendStatus(StatusCodes.NO_CONTENT)
}

export async function handleLogoutAllAttempt(req: Request, res: Response): Promise<Response> {
  await JwtAuthService.closeAllSessions(req)
  res.clearCookie(RefreshTokenCookieName, refreshTokenCookiePayload)
  return res.sendStatus(StatusCodes.NO_CONTENT)
}
