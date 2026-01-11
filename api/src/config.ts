import Zod from 'zod'

const configValidationSchema = Zod.object({
  port: Zod.coerce.number(),
  redisUrl: Zod.url(),
  pgUrl: Zod.url(),
  jwtSecret: Zod.string().length(64),
  productionEnv: Zod.boolean(),
  apiAllowedOrigins: Zod.string().array(),
  captchaServerKey: Zod.string().min(1),
})

const configToValidate = {
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  pgUrl: process.env.PG_URL,
  jwtSecret: process.env.JWT_SECRET,
  productionEnv: process.env.NODE_ENV === 'production',
  captchaServerKey: process.env.CAPTCHA_SERVER_KEY,
  apiAllowedOrigins: process.env.API_ALLOWED_ORIGINS?.split(',')
    .map((v) => v.trim())
    .filter(Boolean),
}

export const config = configValidationSchema.parse(configToValidate)
