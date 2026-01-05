import zod from 'zod'

export type FormFieldsT = zod.infer<typeof FieldsValidationSchema>

export const FieldsValidationSchema = zod
  .strictObject({
    email: zod.email().trim(),
    firstName: zod.string().trim(),
    lastName: zod.string().trim(),
    password: zod.string().min(8, { error: 'Password must contain at least 8 characters.' }),
    passwordConfirmation: zod
      .string()
      .min(8, { error: 'Password must contain at least 8 characters.' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    error: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  })
