import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

import { UserIdentityModel, UserModel } from 'modules/user/index.js'

export default class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.create(UserModel, {})
    em.create(UserIdentityModel, {
      email: 'admin@mail.ru',
      firstName: 'admin',
      lastName: 'admin',
      password: '$argon2id$v=19$m=65536,t=3,p=4$MGQGgOMQS+KgSLZzzixJjg$+hKlDbOSA46nkrahyhEVEe/69VfHdk92v8gI+tPPgcg',
      registrationIp: '::1',
      user,
    })
    await em.flush()
  }
}
