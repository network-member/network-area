import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Outlet } from 'react-router'

import { InvisibleSmartCaptcha } from '@yandex/smart-captcha'

import { Card, SignUpContainer } from './styled'

const LoginLayout: FC = () => {
  const [captcha, setCaptcha] = useState<string | null>(null)
  const [captchaVisible, setCaptchaVisible] = useState<boolean>(false)
  const showCaptcha = useCallback(() => setCaptchaVisible(true), [])

  return (
    <SignUpContainer>
      <Card variant="outlined">
        <Outlet context={{ captcha, showCaptcha }} />
      </Card>
      <InvisibleSmartCaptcha
        sitekey="ysc1_eaLghGiGlIzqMaj1h7xwDl6aj6jLJQPwiHKEff726ea689f5"
        onSuccess={setCaptcha}
        onChallengeHidden={() => setCaptchaVisible(false)}
        visible={captchaVisible}
      />
    </SignUpContainer>
  )
}

export type { LoginLayoutContextI } from './types'

export { useSubmitWithCaptchaGuard } from './hooks'

export default LoginLayout
