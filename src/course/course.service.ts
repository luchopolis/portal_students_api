import { Injectable } from '@nestjs/common'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CourseRepository } from './course.repository'

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}
  async create(params: { dataCourseDto: CreateCourseDto; teacherId: number }) {
    const { dataCourseDto, teacherId } = params

    const course = await this.courseRepository.create({
      data: {
        name: dataCourseDto.name,
        banner: dataCourseDto.banner ?? '',
        code_class: 'AY7891',
        teachersId: Number(teacherId),
      },
    })
    return course
  }

  findAll() {
    return `This action returns all course`
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
