import { type ReactElement, useState } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import FormInput, { type FormInputPropsI } from '../FormInput'

const PasswordFormInput = <
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
>(
  props: Omit<FormInputPropsI<TName, TFieldValues>, 'type' | 'placeholder'>,
): ReactElement => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      placeholder="**************"
      onBlur={() => {
        props.formManagerState.field.onBlur()
        setShowPassword(!showPassword)
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default PasswordFormInput
