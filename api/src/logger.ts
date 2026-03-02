import { AsyncLocalStorage } from 'node:async_hooks'
import { randomUUID } from 'node:crypto'

import { invariant } from 'es-toolkit'
import type { NextFunction, Request, Response } from 'express'
import pino from 'pino'

const storage = new AsyncLocalStorage<{ traceId: string }>()

const logger = pino({
  name: 'root',
  mixin: (opts: { traceId?: string }) => {
    if (typeof opts.traceId === 'string') return opts
    const context = storage.getStore()

    invariant(context !== undefined, 'Logger is called from outside of the ALS context')
    return { ...opts, traceId: context.traceId }
  },
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now()
  const traceId = randomUUID()

  logger.info(
    {
      method: req.method,
      url: req.url,
      userAgent: req.get('user-agent'),
      ip: req.ip ?? req.socket.remoteAddress,
      traceId,
    },
    'Incoming request registered',
  )

  res.on('finish', () => {
    const duration = Date.now() - start

    logger.info(
      {
        status: res.statusCode,
        contentLength: res.get('content-length') ?? 0,
        responseTime: duration,
        traceId,
      },
      'Response has been sent',
    )
  })

  storage.run({ traceId }, next)
}

export default logger
