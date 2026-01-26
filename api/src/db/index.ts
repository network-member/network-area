import { Orm, requestEntityManagerMiddleware } from './micro-orm.js'
import RedisClient from './redis-client.js'

async function gracefulShutdown(): Promise<void> {
  await Orm.close()
  RedisClient.destroy()
  process.exit(0)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

export { RedisClient, Orm, requestEntityManagerMiddleware }
