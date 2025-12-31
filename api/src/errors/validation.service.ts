import type Zod from 'zod'

import { BadRequestApiError } from './constants.js'

export function validateApiRoutePayload<Schema extends Zod.ZodType>(
  payload: unknown,
  schema: Schema,
): Zod.infer<Schema> {
  const result = schema.safeParse(payload)

  if (!result.success) throw new BadRequestApiError(result.error.message)
  return result.data
}
