import { Entity, Enum, OneToOne, OptionalProps, PrimaryKey, Property, type Ref, Unique } from '@mikro-orm/core'

import User from './user.entity.js'

@Entity({ tableName: 'user_oauth_refs' })
@Unique({ properties: ['externalId', 'provider'] })
export default class UserOauthRef {
  [OptionalProps]?: 'updatedAt' | 'createdAt' | 'oauth_ref'

  @PrimaryKey()
  id!: number

  @Property({ type: 'text' })
  externalId!: string

  @Enum({ items: ['yandex'] })
  provider!: 'yandex'

  @OneToOne(() => User, { ref: true })
  user!: Ref<User>

  @Property({ type: 'timestamp with time zone', onUpdate: () => new Date() })
  updatedAt = new Date()

  @Property({ type: 'timestamp with time zone' })
  createdAt = new Date()
}
