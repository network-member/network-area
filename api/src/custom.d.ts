declare namespace Express {
  export interface Request {
    usersId?: number
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- It's ok
    em: import('@mikro-orm/core').EntityManager<import('@mikro-orm/postgresql').PostgreSqlDriver>
  }
}
