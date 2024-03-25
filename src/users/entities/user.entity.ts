import { user } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class User implements user {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  password: string

  @ApiProperty()
  status: boolean

  @ApiProperty()
  picture: string

  created_at: Date

  updated_at: Date

  @ApiProperty()
  role_id: number
}
