import { config } from 'config.js'
import { BadRequestApiError } from 'errors/index.js'

export default async function verifyCaptcha(args: { token: string; ip: string }): Promise<void> {
  const urlEncodedBody = new URLSearchParams(args)
  urlEncodedBody.append('secret', config.captchaServerKey)

  const response = await fetch('https://smartcaptcha.cloud.yandex.ru/validate', {
    method: 'POST',
    body: urlEncodedBody.toString(),
  })
  const data = (await response.json()) as { status: string; host: string; message: string }
  const hostMatch = data.host !== '' && config.apiAllowedOrigins.some((origin) => origin.includes(data.host))

  if (!response.ok || data.status !== 'ok' || !hostMatch) {
    console.error('Captcha error: ', data)
    throw new BadRequestApiError(data.message)
  }
}
