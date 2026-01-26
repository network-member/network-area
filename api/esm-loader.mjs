import path from 'node:path'

import { getFormat, load, resolve as resolveTs, transformSource } from 'ts-node/esm'

export { getFormat, transformSource, load }

export function resolve(specifier, context, defaultResolver) {
  // Check that requester of the module is project source, not external module
  const parentIsFromProject = context.parentURL?.endsWith('.ts')
  // Check that the requested specifier isn't relative
  const isRelativePath = specifier.startsWith('./') || specifier.startsWith('../')
  // Check that the requested specifier has js ext
  const hasJsExtension = path.extname(specifier) === '.js'

  if (parentIsFromProject && !isRelativePath && hasJsExtension) {
    specifier = path.resolve(import.meta.dirname, './src', specifier)
  }

  return resolveTs(specifier, context, defaultResolver)
}
