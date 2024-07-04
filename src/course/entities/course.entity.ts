import { ApiProperty } from '@nestjs/swagger'
import { courses } from '@prisma/client'

export class Course implements courses {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  banner: string

  @ApiProperty()
  code_class: string

  removed: boolean

  @ApiProperty()
  teachersId: number

  inviteIdentifier: string

  created_at: Date

  updated_at: Date
}
