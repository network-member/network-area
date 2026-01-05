import zod from 'zod'

export type FormFieldsT = zod.infer<typeof FieldsValidationSchema>

export const FieldsValidationSchema = zod.strictObject({
  email: zod.email().trim(),
  password: zod.string(),
})
