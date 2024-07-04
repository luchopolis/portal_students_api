import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/common/providers/db.provider'

@Injectable()
export class StudentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(params: {
    where: Prisma.studentsWhereInput
    include?: Prisma.studentsInclude
    select?: Prisma.studentsSelect
  }) {
    const findStudent: Prisma.studentsFindFirstArgs = {
      where: params.where,
    }

    if (params.include) {
      findStudent.include = params.include
    }

    if (params.select) {
      findStudent.select = params.select
    }

    return await this.prismaService.students.findFirstOrThrow(findStudent)
  }

  async studentCourseFindOne(params: {
    where: Prisma.student_courseWhereInput
    include?: Prisma.student_courseInclude
    select?: Prisma.student_courseSelect
  }) {
    const findStudent: Prisma.student_courseFindFirstArgs = {
      where: params.where,
    }

    if (params.include) {
      findStudent.include = params.include
    }

    if (params.select) {
      findStudent.select = params.select
    }

    return await this.prismaService.student_course.findFirst(findStudent)
  }
}
