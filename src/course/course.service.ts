import { Injectable } from '@nestjs/common'
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

  findOne(id: number) {
    return `This action returns a #${id} course`
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`
  }

  remove(id: number) {
    return `This action removes a #${id} course`
  }
}
