import Zod from 'zod'

const configValidationSchema = Zod.object({
  port: Zod.coerce.number(),
  redisUrl: Zod.url(),
  pgUrl: Zod.url(),
  jwtSecret: Zod.string().length(64),
})
const configToValidate = {
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  pgUrl: process.env.PG_URL,
  jwtSecret: process.env.JWT_SECRET,
}

export const config = configValidationSchema.parse(configToValidate)
