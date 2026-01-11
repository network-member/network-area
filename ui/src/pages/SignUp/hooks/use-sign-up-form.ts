import { useCallback, useState } from 'react'
import { type Control, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'

import ApiClient from '@/api/client'
import { useSubmitWithCaptchaGuard } from '@/components/LoginLayout'
import useApiMutation from '@/hooks/use-api-mutation'

import { FieldsValidationSchema, type FormFieldsT } from '../components/FormFields'

interface UseSignInFormResultI {
  control: Control<FormFieldsT>
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isSubmitting: boolean
  submitError: string | null
}

const useSignUpForm = (): UseSignInFormResultI => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(FieldsValidationSchema),
  })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const putSubmitError = useCallback((error: unknown) => {
    if (isAxiosError<{ error: string }>(error) && error.response?.status !== undefined) {
      return setSubmitError(error.response.data.error)
    }
    console.error(error)
    return setSubmitError('Something went wrong, please try again later.')
  }, [])
  const onMutationSuccess = useCallback(async () => {
    await navigate('/')
  }, [navigate])

  const [signUp] = useApiMutation(ApiClient.signUp, {
    errorHandler: putSubmitError,
    onSuccess: onMutationSuccess,
  })

  const submit = useSubmitWithCaptchaGuard({
    formSubmitWrapper: handleSubmit,
    mutation: signUp,
    isSubmitting,
  })

  return {
    control,
    isSubmitting,
    submitError,
    handleSubmit: submit,
  }
}

export default useSignUpForm
