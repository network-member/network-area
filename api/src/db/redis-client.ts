import { createClient } from 'redis'

import { config } from '../config.js'

const redisClient = await createClient({ url: config.redisUrl })
  .on('error', (err) => console.error('Redis Client Error', err))
  .connect()

export default redisClient
