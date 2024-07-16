import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/common/providers/db.provider'
import { Course } from './entities/course.entity'
import { Prisma } from '@prisma/client'

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
        teachersId: data.teachersId,
      },
    })
    return entityCreated
  }

  async findOne(params: {
    where: Prisma.coursesWhereInput
    include?: Prisma.coursesInclude
    select?: Prisma.coursesSelect
  }) {
    const findCourse: Prisma.coursesFindFirstArgs = {
      where: params.where,
    }

    if (params.include) {
      findCourse.include = params.include
    }

    if (params.select) {
      findCourse.select = params.select
    }

    return await this.prismaService.courses.findFirstOrThrow(findCourse)
  }

  async findAll(params: {
    pagination: Prisma.coursesFindManyArgs
    where: Prisma.coursesWhereInput
  }) {
    return await this.prismaService.courses.findMany({
      where: params.where,
      take: params.pagination.take,
      skip: params.pagination.skip ?? 0,
    })
  }

  async update(params: {
    data: Prisma.coursesUpdateInput
    where: Prisma.coursesWhereUniqueInput
  }) {
    return await this.prismaService.courses.update({
      data: params.data,
      where: params.where,
    })
  }

  async studentCourseCreate(
    create: Prisma.XOR<
      Prisma.student_courseCreateInput,
      Prisma.student_courseUncheckedCreateInput
    >,
  ) {
    return await this.prismaService.student_course.create({ data: create })
  }

  async studentsCourseUpdate(params: {
    where: Prisma.student_courseWhereInput
    data: Prisma.student_courseUpdateInput
  }) {
    await this.prismaService.student_course.updateMany({
      data: params.data,
      where: params.where,
    })
  }

  async studentsInCourse(params: { courseId: number }) {
    const response = await this.prismaService.student_course.findMany({
      where: {
        course_id: Number(params.courseId),
        active: true,
      },

      select: {
        student: {
          select: {
            id: true,
            name: true,
            last_name: true,
            user: {
              select: {
                id: true,
                picture: true,
              },
            },
          },
        },
      },
    })

    return response
  }
}
