import { defineConfig } from '@mikro-orm/core'
import 'reflect-metadata'

import parseConfig from '../../configuration.js'
import MicroOrmConfiguration from './config.js'

export default defineConfig({
  ...MicroOrmConfiguration,
  clientUrl: parseConfig().pgUrl,
})
