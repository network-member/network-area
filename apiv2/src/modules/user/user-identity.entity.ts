import { OptionalProps, type Ref } from '@mikro-orm/core'
import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/decorators/legacy'

import User from './user.entity.js'

console.log(Reflect.metadata)
@Entity({ tableName: 'user_identities' })
export default class UserIdentity {
  [OptionalProps]?: 'updatedAt' | 'createdAt' | 'userId'

  @PrimaryKey()
  id!: number

  @Property({ unique: true, type: 'text' })
  email!: string

  @Property({ type: 'text' })
  firstName!: string

  @Property({ type: 'text' })
  lastName!: string

  @Property({ type: 'text' })
  password!: string

  @Property({ type: 'text' })
  registrationIp!: string

  @OneToOne(() => User, { ref: true })
  user!: Ref<User>

  @Property({ type: 'timestamp with time zone', onUpdate: () => new Date() })
  updatedAt = new Date()

  @Property({ type: 'timestamp with time zone' })
  createdAt = new Date()
}
