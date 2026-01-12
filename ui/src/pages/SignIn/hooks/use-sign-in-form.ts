import { useCallback, useState } from 'react'
import { type Control, useForm } from 'react-hook-form'
import { useNavigate, useOutletContext } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { HttpStatusCode, isAxiosError } from 'axios'

import ApiClient from '@/api/client'
import { type LoginLayoutContextI, useSubmitWithCaptchaGuard } from '@/components/LoginLayout'
import useApiMutation from '@/hooks/use-api-mutation'

import { FieldsValidationSchema, type FormFieldsT } from '../components/FormFields'

interface UseSignInFormResultI {
  control: Control<FormFieldsT>
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isSubmitting: boolean
  submitError: string | null
}

const useSignInForm = (): UseSignInFormResultI => {
  const { remountCaptcha } = useOutletContext<LoginLayoutContextI>()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(FieldsValidationSchema),
  })

  const [submitError, setSubmitError] = useState<string | null>(null)
  const putSubmitError = useCallback(
    (error: unknown) => {
      remountCaptcha()
      if (isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized) {
        return setSubmitError('Credentials are not valid.')
      }
      console.error(error)
      return setSubmitError('Something went wrong, please try again later.')
    },
    [remountCaptcha],
  )
  const onMutationSuccess = useCallback(async () => {
    await navigate('/')
  }, [navigate])

  const [login] = useApiMutation(ApiClient.login, {
    errorHandler: putSubmitError,
    onSuccess: onMutationSuccess,
  })
  const submit = useSubmitWithCaptchaGuard({
    formSubmitWrapper: handleSubmit,
    mutation: login,
    isSubmitting,
  })

  return {
    control,
    isSubmitting,
    submitError,
    handleSubmit: submit,
  }
}

export default useSignInForm
