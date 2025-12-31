import knex from 'knex'

import { config } from 'config.js'

const knexClient = knex({
  client: 'pg',
  connection: {
    connectionString: config.pgUrl,
  },
})

export default knexClient
