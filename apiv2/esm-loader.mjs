import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getFormat, load, resolve as resolveTs, transformSource } from 'ts-node/esm'

export { getFormat, transformSource, load }

export function resolve(specifier, context, defaultResolver) {
  const isRelativePath = specifier.startsWith('./') || specifier.startsWith('../')
  const hasJsExtension = path.extname(specifier) === '.js'

  const parentPath = context.parentURL ? fileURLToPath(context.parentURL) : ''
  const parentIsFromSrc = parentPath.includes('/src/')
  const parentIsFromDist = parentPath.includes('/dist/')

  if (!isRelativePath && hasJsExtension && (parentIsFromSrc || parentIsFromDist)) {
    const baseDir = parentIsFromDist ? './dist' : './src'
    specifier = path.resolve(import.meta.dirname, baseDir, specifier)
  }

  return resolveTs(specifier, context, defaultResolver)
}
