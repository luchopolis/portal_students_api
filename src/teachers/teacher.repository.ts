import { Injectable } from '@nestjs/common'
import { Prisma, user } from '@prisma/client'
import { PrismaService } from 'src/common/providers/db.provider'

@Injectable()
export class TeacherRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFirst(args: Prisma.teachersFindFirstArgs) {
    return this.prismaService.teachers.findFirst(args)
  }
}
