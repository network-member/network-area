import { OptionalProps, type Ref } from '@mikro-orm/core'
import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/decorators/legacy'

import UserIdentity from './user-identity.entity.js'
import UserOauthRef from './user-oauth-ref.entity.js'

@Entity({ tableName: 'users' })
export default class User {
  [OptionalProps]?: 'updatedAt' | 'createdAt' | 'oauth_ref' | 'identity'

  @PrimaryKey()
  id!: number

  @OneToOne(() => UserOauthRef, { mappedBy: 'user', ref: true, lazy: true })
  oauth_ref!: Ref<UserOauthRef | null>

  @OneToOne(() => UserIdentity, { mappedBy: 'user', ref: true, lazy: true })
  identity!: Ref<UserIdentity | null>

  @Property({ type: 'timestamp with time zone', onUpdate: () => new Date() })
  updatedAt = new Date()

  @Property({ type: 'timestamp with time zone' })
  createdAt = new Date()
}
