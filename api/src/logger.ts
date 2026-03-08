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
    const context = getContextualLoggerStore()

    invariant(context !== undefined, 'Logger is called from outside of the ALS context')
    return { ...opts, ...context }
  },
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

export function getContextualLoggerStore(): { traceId: string } | undefined {
  return storage.getStore()
}

export function contextualLoggerMiddleware(req: Request, res: Response, next: NextFunction): void {
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

export function withContextualLogger<T>(fn: (...args: unknown[]) => T): T {
  const traceId = randomUUID()
  return storage.run({ traceId }, fn)
}

export default logger
