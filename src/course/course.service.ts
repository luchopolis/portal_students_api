import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CourseRepository } from './course.repository'
import { CourseUtils } from './utils/course.utils'
import { Prisma } from '@prisma/client'

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly courseUtils: CourseUtils,
  ) {}
  async create(params: { dataCourseDto: CreateCourseDto; teacherId: number }) {
    const { dataCourseDto, teacherId } = params

    const course = await this.courseRepository.create({
      data: {
        name: dataCourseDto.name,
        banner: dataCourseDto.banner ?? '',
        code_class: this.courseUtils.generateCode(),
        teachersId: Number(teacherId),
      },
    })
    return course
  }

  async findAll(userOwner: number, paramsFilter?: Prisma.coursesFindManyArgs) {
    const result = await this.courseRepository.findAll({
      pagination: paramsFilter,
      where: {
        teachersId: userOwner,
      },
    })
    return result
  }

  async findOne(paramsFindOne: Prisma.coursesFindFirstArgs) {
    try {
      const courseDetail = await this.courseRepository.findOne({
        where: paramsFindOne.where,
        include: paramsFindOne.include,
        select: {
          id: true,
          banner: true,
          code_class: true,
        },
      })
      return courseDetail
    } catch (error: any) {
      if (typeof error === 'object') {
        if (error.code === 'P2025') {
          throw new NotFoundException('Course Not Found')
        }
      }
      throw new Error(error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update({
      data: updateCourseDto,
      where: {
        id,
      },
    })
  }

  remove(id: number) {
    return `This action removes a #${id} course`
  }
}
