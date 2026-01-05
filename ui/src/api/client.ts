import axios from 'axios'

import { apiUrl } from '@/config'
import { removeAccessTokenFromLs, setAccessTokenToLs } from '@/utils/local-storage'

import { reqInterceptorOnFulfilled, responseInterceptorOnRejected } from './interceptors'

const axiosConfig = {
  baseURL: apiUrl,
  timeout: 1000,
}

const apiClient = axios.create(axiosConfig)
apiClient.interceptors.request.use(reqInterceptorOnFulfilled)
apiClient.interceptors.response.use(undefined, responseInterceptorOnRejected)

const login = async (loginPayload: { email: string; password: string }): Promise<void> => {
  const { data } = await axios.post<{ accessToken: string }>('/auth', loginPayload, {
    ...axiosConfig,
    withCredentials: true,
  })
  setAccessTokenToLs(data.accessToken)
}

const signUp = async (signUpPayload: {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirmation: string
}): Promise<void> => {
  const { data } = await axios.post<{ accessToken: string }>('/sign-up', signUpPayload, {
    ...axiosConfig,
    withCredentials: true,
  })
  setAccessTokenToLs(data.accessToken)
}

const logout = async (): Promise<void> => {
  await apiClient.post<undefined>('/auth/session/logout', undefined, {
    withCredentials: true,
  })
  removeAccessTokenFromLs()
}

const ping = async (): Promise<string> => {
  const { data } = await apiClient.post<string>('/ping')
  return data
}

export default { login, signUp, logout, ping }
