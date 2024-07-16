import { User } from 'src/users/entities/user.entity'

export type UserBasicResponse = Pick<
  User,
  'id' | 'created_at' | 'email' | 'picture' | 'status'
>
