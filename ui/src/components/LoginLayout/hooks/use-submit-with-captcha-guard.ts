import { useEffect, useMemo, useState } from 'react'
import type { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import { useOutletContext } from 'react-router'

import type { LoginLayoutContextI } from '../types'

const useSubmitWithCaptchaGuard = <Args extends FieldValues>({
  formSubmitWrapper,
  mutation,
  isSubmitting,
}: {
  mutation: (args: Args & { captcha: string }) => Promise<void>
  formSubmitWrapper: UseFormHandleSubmit<Args>
  isSubmitting: boolean
}): ReturnType<UseFormHandleSubmit<Args>> => {
  const { captcha, showCaptcha } = useOutletContext<LoginLayoutContextI>()
  const [shouldDoSubmitShot, setShouldDoSubmitShot] = useState(false)

  const submit = useMemo(
    () =>
      formSubmitWrapper(async (data) => {
        if (captcha === null) {
          setShouldDoSubmitShot(true)
          return showCaptcha()
        }
        setShouldDoSubmitShot(false)
        await mutation({ ...data, captcha })
      }),
    [captcha, showCaptcha, formSubmitWrapper, mutation],
  )

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- it's ok
    if (shouldDoSubmitShot && captcha !== null && !isSubmitting) submit()
  }, [submit, shouldDoSubmitShot, captcha, isSubmitting])

  return submit
}

export default useSubmitWithCaptchaGuard
