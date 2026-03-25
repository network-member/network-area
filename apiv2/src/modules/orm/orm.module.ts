import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { MikroOrmModule } from '@mikro-orm/nestjs'

import type { AppConfigT } from '../../configuration.js'
import MicroOrmConfiguration from './config.js'

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfigT, true>) => {
        const pgUrl = configService.getOrThrow<string>('pgUrl')
        return { ...MicroOrmConfiguration, clientUrl: pgUrl }
      },
      driver: PostgreSqlDriver,
    }),
  ],
})
export default class OrmModule {}
