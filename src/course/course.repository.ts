import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/common/providers/db.provider'
import { Course } from './entities/course.entity'

@Injectable()
export class CourseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(params: {
    data: Pick<Course, 'name' | 'banner' | 'code_class' | 'teachersId'>
  }) {
    // generate Unique code

    const { data } = params
    const entityCreated = await this.prismaService.courses.create({
      data: {
        name: data.name,
        banner: data.banner,
        code_class: data.code_class,
        teachersId: 1,
      },
    })
    return entityCreated
  }
}
