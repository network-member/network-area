import { defineConfig } from '@mikro-orm/core'
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy'
import { Migrator } from '@mikro-orm/migrations'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { SeedManager } from '@mikro-orm/seeder'
import { kebabCase } from 'es-toolkit'

export default defineConfig({
  driver: PostgreSqlDriver,
  metadataProvider: ReflectMetadataProvider,
  extensions: [Migrator, SeedManager],
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],
  debug: true,
  seeder: {
    path: 'dist/seeders',
    pathTs: 'src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    fileName: (className: string) => kebabCase(className),
  },
  migrations: {
    path: 'dist/db/migrations',
    pathTs: 'src/migrations',
    fileName: (timestamp: string, name?: string) => `migration-${timestamp}${name === undefined ? '' : '-' + name}`,
  },
})
