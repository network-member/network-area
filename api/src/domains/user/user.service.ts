import type { EntityManager } from '@mikro-orm/core'
import { hash, verify } from 'argon2'

import { Orm } from 'db/index.js'
import { BadRequestApiError } from 'errors/index.js'

import UserIdentityModel from './user-identity.entity.js'
import UserModel from './user.entity.js'

interface GetUserByCredentialsArgs {
  email: string
  password: string
}

export async function getUserByCredentials(
  { email, password }: GetUserByCredentialsArgs,
  { em }: { em: EntityManager },
): Promise<UserModel | null> {
  const user = await em.findOne(UserModel, { identity: { email } }, { populate: ['identity'] })
  if (user === null) return null

  const hashMatch = await verify(user.identity.$.password, password)
  if (!hashMatch) return null

  return user
}

await getUserByCredentials({ email: 'admin@mail.ru', password: 'admin' }, { em: Orm.em.fork() })

interface CreateUserArgsI {
  email: string
  firstName: string
  lastName: string
  password: string
  ip: string
}

export async function createUser(args: CreateUserArgsI, { em }: { em: EntityManager }): Promise<UserModel> {
  const userWithSameEmail = await em.findOne(UserModel, { identity: { email: args.email } })
  if (userWithSameEmail !== null) throw new BadRequestApiError('User with this email address already exists.')

  const user = em.create(UserModel, {})
  em.create(UserIdentityModel, {
    email: args.email,
    firstName: args.firstName,
    lastName: args.lastName,
    password: await hash(args.password),
    registrationIp: args.ip,
    user,
  })

  return user
}
