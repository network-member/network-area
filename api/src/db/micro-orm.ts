import { Migrator } from '@mikro-orm/migrations'
import { MikroORM, defineConfig } from '@mikro-orm/postgresql'
import { SeedManager } from '@mikro-orm/seeder'
import { kebabCase } from 'es-toolkit'
import type { NextFunction, Request, Response } from 'express'
import 'reflect-metadata'

import { config } from 'config.js'
import Logger, { getContextualLoggerStore } from 'logger.js'

const logger = Logger.child({ name: 'mikro-orm' })

const ormConfig = defineConfig({
  clientUrl: config.pgUrl,
  extensions: [Migrator, SeedManager],
  loadStrategy: 'joined',
  entities: ['build/**/*.entity.js'],
  entitiesTs: ['src/domains/**/*.entity.ts'],
  debug: true,
  logger: (message) => {
    const context = getContextualLoggerStore()
    const loggerBindings = context ?? { traceId: 'mikro-orm' }
    logger.debug({ ...loggerBindings }, message)
  },
  seeder: {
    path: 'build/db/seeders', // path to the folder with seeders
    pathTs: 'src/db/seeders', // path to the folder with TS seeders (if used, you should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    fileName: (className: string) => kebabCase(className), // seeder file naming convention
  },
  migrations: {
    path: 'build/db/migrations',
    pathTs: 'src/db/migrations',
    fileName: (timestamp: string, name?: string) => `migration-${timestamp}${name === undefined ? '' : '-' + name}`,
  },
})

export const Orm = await MikroORM.init(ormConfig)

export function requestEntityManagerMiddleware(req: Request, _res: Response, next: NextFunction): void {
  req.em = Orm.em.fork()
  next()
}

export default ormConfig
