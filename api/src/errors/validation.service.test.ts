import Zod from 'zod'

import { BadRequestApiError } from './constants.js'
import { validateApiRoutePayload } from './validation.service.js'

const personSchema = Zod.object({
  name: Zod.string(),
  age: Zod.number(),
})

describe('validateApiRoutePayload', () => {
  it('returns parsed data when payload is valid', () => {
    const payload = { name: 'Alice', age: 30 }
    const result = validateApiRoutePayload(payload, personSchema)
    expect(result).toEqual({ name: 'Alice', age: 30 })
  })

  it('throws BadRequestApiError when payload fails validation', () => {
    const payload = { name: 123, age: 'not a number' }
    expect(() => validateApiRoutePayload(payload, personSchema)).toThrow(BadRequestApiError)
  })

  it('throws BadRequestApiError for missing required fields', () => {
    expect(() => validateApiRoutePayload({}, personSchema)).toThrow(BadRequestApiError)
  })

  it('throws BadRequestApiError for unknown payload types', () => {
    expect(() => validateApiRoutePayload(null, personSchema)).toThrow(BadRequestApiError)
  })

  it('returns transformed data when schema applies transforms', () => {
    const schema = Zod.object({
      value: Zod.string().transform((v) => v.toUpperCase()),
    })
    const result = validateApiRoutePayload({ value: 'hello' }, schema)
    expect(result).toEqual({ value: 'HELLO' })
  })

  it('rejects extra fields with a strictObject schema', () => {
    const strict = Zod.strictObject({ name: Zod.string() })
    expect(() => validateApiRoutePayload({ name: 'Alice', extra: true }, strict)).toThrow(BadRequestApiError)
  })
})
