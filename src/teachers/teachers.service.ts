import { Injectable } from '@nestjs/common'
import { CreateTeacherDto } from './dto/create-teacher.dto'
import { UpdateTeacherDto } from './dto/update-teacher.dto'
import { PrismaService } from 'src/common/providers/db.provider'

@Injectable()
export class TeachersService {
  constructor(private prismaService: PrismaService) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createTeacherDto: CreateTeacherDto) {
    return 'This action adds a new teacher'
  }

  async findAll() {
    const result = await this.prismaService.teachers.findMany()
    return result
  }

  async findOne(id: number) {
    const result = await this.prismaService.teachers.findFirst({
      select: {
        id: true,
        name: true,
        last_name: true,
        code_teacher: true,
      },
      where: {
        id,
      },
    })

    return result
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`
  }
}
