import { KnexClient } from 'db/index.js'

export interface UserI {
  id: number
  email: string
  first_name: string
  last_name: string
  password: string
  registration_ip: string
  created_at: string
  updated_at: string
}

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Unable to provide proper typing explicitly
export default function userQueryBuilder() {
  return KnexClient<UserI>('users')
}
