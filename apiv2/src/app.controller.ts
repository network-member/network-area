import { Controller, Get, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppService } from './app.service.js'
import type { AppConfigT } from './configuration.js'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<AppConfigT, true>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
