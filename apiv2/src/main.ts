import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'
import 'reflect-metadata'

import { AppModule } from 'app.module.js'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  app.useLogger(app.get(Logger))
  app.enableShutdownHooks()

  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(`API is running on http://localhost:${process.env.PORT ?? 3000}`)
  })
}

await bootstrap()
