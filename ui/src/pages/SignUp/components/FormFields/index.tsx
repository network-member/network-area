import type { FC } from 'react'
import { type Control, Controller } from 'react-hook-form'

import FormInput from '@/components/form-controls/FormInput'
import PasswordFormInput from '@/components/form-controls/PasswordFormInput'

import { FieldsValidationSchema, type FormFieldsT } from './validation-schema'

const FormFields: FC<{ control: Control<FormFieldsT> }> = ({ control }) => {
  return (
    <>
      <Controller
        name="firstName"
        control={control}
        render={(state) => (
          <FormInput
            formManagerState={state}
            label="First name"
            required
            autoComplete="name"
            placeholder="John"
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={(state) => (
          <FormInput
            formManagerState={state}
            label="Last name"
            required
            autoComplete="name"
            placeholder="Snow"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={(state) => (
          <FormInput
            formManagerState={state}
            label="Email"
            required
            autoComplete="email"
            type="email"
            placeholder="your@email.com"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={(state) => <PasswordFormInput formManagerState={state} label="Password" required />}
      />
      <Controller
        name="passwordConfirmation"
        control={control}
        render={(state) => (
          <PasswordFormInput formManagerState={state} label="Password confirmation" required />
        )}
      />
    </>
  )
}

export default FormFields

export { FieldsValidationSchema }

export type { FormFieldsT }
