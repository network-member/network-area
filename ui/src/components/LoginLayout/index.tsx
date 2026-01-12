import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

import { InvisibleSmartCaptcha } from '@yandex/smart-captcha'

import { getAccessTokenFromLs } from '@/utils/local-storage'

import { Card, SignUpContainer } from './styled'

const LoginLayout: FC = () => {
  const [captcha, setCaptcha] = useState<string | null>(null)
  const [captchaVisible, setCaptchaVisible] = useState<boolean>(false)
  const showCaptcha = useCallback(() => setCaptchaVisible(true), [])

  const [captchaKey, setCaptchaKey] = useState(new Date().getTime())
  const remountCaptcha = useCallback(() => {
    setCaptchaKey(new Date().getTime())
    setCaptchaVisible(false)
    setCaptcha(null)
  }, [])

  const accessToken = getAccessTokenFromLs()
  if (typeof accessToken === 'string') return <Navigate to="/" replace />

  return (
    <>
      <SignUpContainer>
        <Card variant="outlined">
          <Outlet context={{ captcha, showCaptcha, remountCaptcha }} />
        </Card>
        <InvisibleSmartCaptcha
          sitekey="ysc1_eaLghGiGlIzqMaj1h7xwDl6aj6jLJQPwiHKEff726ea689f5"
          key={captchaKey}
          onSuccess={setCaptcha}
          onChallengeHidden={() => setCaptchaVisible(false)}
          visible={captchaVisible}
        />
      </SignUpContainer>
    </>
  )
}

export type { LoginLayoutContextI } from './types'

export { useSubmitWithCaptchaGuard } from './hooks'

export default LoginLayout
