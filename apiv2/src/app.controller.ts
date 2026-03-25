import { Controller, Get } from '@nestjs/common'
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
    const a = this.configService.get<number>('pgUrl')
    console.log(a)
    return this.appService.getHello()
  }
}
