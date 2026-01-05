import { hash, verify } from 'argon2'

import { BadRequestApiError } from 'errors/index.js'

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

interface CreateUserArgsI {
  email: string
  firstName: string
  lastName: string
  password: string
  ip: string
}

export async function createUser(args: CreateUserArgsI): Promise<UserI> {
  const users = await UserQueryBuilder().where({ registration_ip: args.ip }).orWhere({ email: args.email })

  const ipAddressMatchCount = users.filter((user) => user.registration_ip === args.ip).length
  if (ipAddressMatchCount >= 3) throw new BadRequestApiError('You cannot register more than 3 users per IP address.')

  const emailMatch = users.some((user) => user.email === args.email)
  if (emailMatch) throw new BadRequestApiError('User with this email address already exists.')

  const [user] = await UserQueryBuilder()
    .insert({
      email: args.email,
      first_name: args.firstName,
      last_name: args.lastName,
      password: await hash(args.password),
      registration_ip: args.ip,
    })
    .returning('*')

  return user
}
