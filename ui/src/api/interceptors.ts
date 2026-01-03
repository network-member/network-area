import axios, { type AxiosError, HttpStatusCode, type InternalAxiosRequestConfig } from 'axios'
import { jwtDecode } from 'jwt-decode'

import { apiUrl } from '@/config'
import {
  getAccessTokenFromLs,
  removeAccessTokenFromLs,
  setAccessTokenToLs,
} from '@/utils/local-storage'

/** 5 sec */
const accessTokenLifetimeGap = 5

class UnauthorizedApiError extends Error {}

export const reqInterceptorOnFulfilled = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  try {
    let accessToken = getAccessTokenFromLs()
    if (typeof accessToken !== 'string') throw new UnauthorizedApiError()

    const exp = getTokenExpValue(accessToken)
    const tokenExpired = exp - new Date().getTime() / 1000 - accessTokenLifetimeGap < 0

    if (tokenExpired) accessToken = await refreshToken(accessToken)

    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  } catch (error) {
    if (error instanceof UnauthorizedApiError) logout()
    throw error
  }
}

export const responseInterceptorOnRejected = (error: AxiosError): void => {
  if (error.response?.status === HttpStatusCode.Unauthorized) return logout()
  throw error
}

function logout(): void {
  removeAccessTokenFromLs()
  location.replace('/sign-in')
}

async function refreshToken(tokenToRefresh: string): Promise<string> {
  const { status, data } = await axios.post<{ accessToken: string }>(
    `${apiUrl}/auth/session/refresh`,
    {},
    {
      headers: { Authorization: `Bearer ${tokenToRefresh}` },
      validateStatus: (status) => [HttpStatusCode.Ok, HttpStatusCode.Unauthorized].includes(status),
      withCredentials: true,
      timeout: 1000,
    },
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- eslint bug
  if (status !== HttpStatusCode.Ok) throw new UnauthorizedApiError()

  setAccessTokenToLs(data.accessToken)
  return data.accessToken
}

function getTokenExpValue(accessToken: string): number {
  try {
    const decoded = jwtDecode(accessToken)
    return decoded.exp ?? 0
  } catch {
    throw new UnauthorizedApiError()
  }
}
