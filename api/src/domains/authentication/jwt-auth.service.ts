import crypto from 'node:crypto'

import type { Request } from 'express'
import jwt from 'jsonwebtoken'

import { config } from 'config.js'
import { RedisClient } from 'db/index.js'
import { UnauthorizedApiError } from 'errors/index.js'

interface AccessTokenPayloadI {
  userAgent: string | null
  sub: string
  iat: number
  exp: number
}

interface AuthenticateRequestResult {
  accessToken: string
  accessTokenPayload: AccessTokenPayloadI
}

/** 30 суток в секундах */
export const RefreshTokenTTL = 30 * 24 * 60 * 60

export const RefreshTokenCookieName = 'refreshToken'

/** 30 минут в секундах */
const accessTokenTTL = 30 * 60

/** 5 минут в секундах */
const accessTokenLifetimeGap = 5 * 60

async function createTokensPair(
  req: Request,
  { userId }: { userId: number },
): Promise<{ accessToken: string; refreshToken: string }> {
  const userAgent = req.headers['user-agent'] ?? null

  const accessToken = sign({ userAgent, userId })
  const refreshToken = crypto.randomBytes(32).toString('hex')

  await RedisClient.set(`accessToken:${userId}:${refreshToken}`, accessToken, {
    expiration: { type: 'EX', value: RefreshTokenTTL },
  })

  return { accessToken, refreshToken }
}

function authenticate(req: Request): { userId: number } {
  const { accessTokenPayload } = authenticateRequest(req)
  return { userId: Number(accessTokenPayload.sub) }
}

async function refreshToken(req: Request): Promise<string> {
  const { accessToken, accessTokenPayload } = authenticateRequest(req, { ignoreExpiration: true })
  const accessTokenKey = await validateAccessRefreshPair(req, { accessToken, accessTokenPayload })

  const now = Math.floor(Date.now() / 1000)
  if (accessTokenPayload.exp - now < accessTokenLifetimeGap) throw new UnauthorizedApiError()

  const refreshedAccessToken = sign({ userAgent: accessTokenPayload.userAgent, userId: accessTokenPayload.sub })
  await RedisClient.set(accessTokenKey, refreshedAccessToken, { expiration: 'KEEPTTL' })

  return refreshedAccessToken
}

async function closeSession(req: Request): Promise<void> {
  const authResult = authenticateRequest(req)
  const accessTokenKey = await validateAccessRefreshPair(req, authResult)
  await RedisClient.del(accessTokenKey)
}

async function closeAllSessions(req: Request): Promise<void> {
  const { accessTokenPayload } = authenticateRequest(req)
  const redisKeysToDelete = await RedisClient.keys(`accessToken:${accessTokenPayload.sub}:*`)
  await RedisClient.del(redisKeysToDelete)
}

async function validateAccessRefreshPair(
  req: Request,
  { accessToken, accessTokenPayload }: AuthenticateRequestResult,
): Promise<string> {
  const refreshToken = req.cookies[RefreshTokenCookieName] as string | undefined | null
  if (typeof refreshToken !== 'string') throw new UnauthorizedApiError()

  const accessTokenKey = `accessToken:${accessTokenPayload.sub}:${refreshToken}`
  const latestAccessToken = await RedisClient.get(accessTokenKey)
  if (typeof latestAccessToken !== 'string' || latestAccessToken !== accessToken) throw new UnauthorizedApiError()

  return accessTokenKey
}

function authenticateRequest(req: Request, options?: jwt.VerifyOptions): AuthenticateRequestResult {
  const userAgent = req.headers['user-agent'] ?? null
  const authHeader = req.headers.authorization
  if (typeof authHeader !== 'string') throw new UnauthorizedApiError()

  const accessToken = authHeader.replace('Bearer ', '')
  const accessTokenPayload = verify(accessToken, options)

  if (accessTokenPayload.userAgent !== userAgent) throw new UnauthorizedApiError()
  return { accessToken, accessTokenPayload }
}

function sign({ userAgent, userId }: { userAgent: string | null; userId: number | string }): string {
  const secret = Buffer.from(config.jwtSecret, 'hex')
  const iat = Math.floor(Date.now() / 1000)

  const accessTokenPayload = { userAgent, iat, sub: userId.toString(), exp: iat + accessTokenTTL }
  return jwt.sign(accessTokenPayload, secret)
}

function verify(token: string, options?: jwt.VerifyOptions): AccessTokenPayloadI {
  const secret = Buffer.from(config.jwtSecret, 'hex')
  try {
    return jwt.verify(token, secret, options) as AccessTokenPayloadI
  } catch {
    throw new UnauthorizedApiError()
  }
}

export default { createTokensPair, authenticate, refreshToken, closeSession, closeAllSessions }
