import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import configuration from './configuration.js'
import LoggerModule from './modules/logger.module.js'
import OrmModule from './modules/orm/index.js'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true, load: [configuration] }), OrmModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
