import KnexClient from './knex-client.js'
import RedisClient from './redis-client.js'

async function gracefulShutdown(): Promise<void> {
  await KnexClient.destroy()
  RedisClient.destroy()
  process.exit(0)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

export { RedisClient, KnexClient }
