declare module '*.svg' {
  // There is no other option: if file contain import statement, then it's
  // threaten like a module and declaration merging is not done.
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- Above
  const comp: import('react').FC<import('react').SVGAttributes>
  export default comp
}

declare module '*.svg?url' {
  const url: string
  export default url
}

declare module '*.css' {
  const module: Record<string, string>
  export = module
}
