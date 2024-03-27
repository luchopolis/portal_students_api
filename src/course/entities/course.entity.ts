import { courses } from '@prisma/client'

export class Course implements courses {
  id: number

  name: string

  banner: string

  code_class: string

  removed: boolean

  teachersId: number

  created_at: Date

  updated_at: Date
}
