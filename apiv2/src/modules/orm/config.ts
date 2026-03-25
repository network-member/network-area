import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy'
import { Migrator } from '@mikro-orm/migrations'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { SeedManager } from '@mikro-orm/seeder'
import { kebabCase } from 'es-toolkit'

export default {
  driver: PostgreSqlDriver,
  metadataProvider: ReflectMetadataProvider,
  extensions: [Migrator, SeedManager],
  loadStrategy: 'joined' as const,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],
  debug: true,
  seeder: {
    path: 'build/seeders',
    pathTs: 'src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    fileName: (className: string) => kebabCase(className),
  },
  migrations: {
    path: 'build/db/migrations',
    pathTs: 'src/db/migrations',
    fileName: (timestamp: string, name?: string) => `migration-${timestamp}${name === undefined ? '' : '-' + name}`,
  },
}
