export function getAccessTokenFromLs(): string | null {
  return localStorage.getItem('accessToken')
}

export function setAccessTokenToLs(token: string): void {
  localStorage.setItem('accessToken', token)
}

export function removeAccessTokenFromLs(): void {
  localStorage.removeItem('accessToken')
}
