import { verify } from 'argon2'

import UserQueryBuilder, { type UserI } from './user.query-builder.js'

interface GetUserByCredentialsArgs {
  email: string
  password: string
}

export async function getUserByCredentials({ email, password }: GetUserByCredentialsArgs): Promise<UserI | null> {
  const user = await UserQueryBuilder().where({ email }).first()
  if (user === undefined) return null

  const hashMatch = await verify(user.password, password)
  if (!hashMatch) return null

  return user
}
