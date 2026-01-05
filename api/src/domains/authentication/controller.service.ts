import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Zod from 'zod'

import { config } from 'config.js'
import { UserService } from 'domains/user/index.js'
import { BadRequestApiError, UnauthorizedApiError, validateApiRoutePayload } from 'errors/index.js'

import JwtAuthService, { RefreshTokenCookieName, RefreshTokenTTL } from './jwt-auth.service.js'

const refreshTokenCookiePayload = {
  httpOnly: true,
  secure: config.productionEnv,
  sameSite: 'strict',
  maxAge: RefreshTokenTTL * 1000,
  path: '/auth/session',
} as const

const authPayloadValidationSchema = Zod.strictObject({ email: Zod.email(), password: Zod.string().min(1) })

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

export const signUpPayloadValidationSchema = Zod.strictObject({
  email: Zod.email().trim(),
  firstName: Zod.string().trim(),
  lastName: Zod.string().trim(),
  password: Zod.string().min(8),
  passwordConfirmation: Zod.string().min(8),
}).refine((data) => data.password === data.passwordConfirmation, {
  path: ['passwordConfirmation'],
})

export async function handleSignUp(req: Request, res: Response): Promise<Response> {
  const payload = validateApiRoutePayload(req.body, signUpPayloadValidationSchema)

  if (req.ip === undefined || req.ip === '') {
    console.error(`Detected empty IP address. params: ${JSON.stringify(payload)}`)
    throw new BadRequestApiError('Cannot recognize your IP address.')
  }

  const user = await UserService.createUser({ ...payload, ip: req.ip })
  const { accessToken, refreshToken } = await JwtAuthService.createTokensPair(req, { userId: user.id })

  res.cookie(RefreshTokenCookieName, refreshToken, refreshTokenCookiePayload)
  return res.status(StatusCodes.OK).send({ accessToken })
}
