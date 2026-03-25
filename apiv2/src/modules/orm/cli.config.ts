import 'reflect-metadata'

import parseConfig from '../../configuration.js'
import MicroOrmConfiguration from './config.js'

export default {
  ...MicroOrmConfiguration,
  clientUrl: parseConfig().pgUrl,
}
