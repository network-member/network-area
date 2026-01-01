import type { ReactElement } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'

import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import type { StandardTextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'

import type { FieldManagerState } from '../types'

export interface FormInputPropsI<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues,
> extends StandardTextFieldProps {
  formManagerState: FieldManagerState<TFieldValues, TName>
}

const FormInput = <
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
>(
  props: FormInputPropsI<TName, TFieldValues>,
): ReactElement => {
  const {
    formManagerState: { field, fieldState },
    label,
    ...restProps
  } = props

  return (
    <FormControl>
      <FormLabel htmlFor={field.name} error={fieldState.invalid}>
        {label}
      </FormLabel>
      <TextField
        {...field}
        value={field.value ?? ''}
        id={field.name}
        fullWidth
        error={fieldState.invalid}
        helperText={fieldState.error?.message}
        {...restProps}
      />
    </FormControl>
  )
}

export default FormInput
