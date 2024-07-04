import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CourseRepository } from './course.repository'
import { CourseUtils } from './utils/course.utils'
import { Prisma } from '@prisma/client'
import { StudentRepository } from 'src/student/student.repository'

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly courseUtils: CourseUtils,
    private readonly studentsRepository: StudentRepository,
  ) {}
  async create(params: { dataCourseDto: CreateCourseDto; teacherId: number }) {
    const { dataCourseDto, teacherId } = params

    const courseCode = this.courseUtils.generateCode()

    const identifierForCourse = Math.floor(
      Math.random() * Date.now(),
    ).toString()
    const course = await this.courseRepository.create({
      data: {
        name: dataCourseDto.name,
        banner: dataCourseDto.banner ?? '',
        code_class: courseCode,
        teachersId: Number(teacherId),
      },
    })

    // assign the course url identifier
    await this.courseRepository.update({
      data: {
        inviteIdentifier: this.courseUtils.generateBase64Data({
          toEncode: identifierForCourse,
        }),
      },
      where: {
        id: course.id,
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

  async studentCourse(
    studentId: number,
    paramsFilter?: Prisma.coursesFindManyArgs,
  ) {
    const result = await this.courseRepository.findAll({
      pagination: paramsFilter,
      where: {
        student_course: {
          some: {
            student: {
              user_id: studentId,
            },
          },
        },
      },
    })

    return result
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

  async joinUserInCourse(code: string, userId: number) {
    // find student
    const studentInfo = await this.studentsRepository.findOne({
      where: {
        user_id: userId,
      },
    })

    const findCourse = await this.findOne({
      where: {
        code_class: code,
      },
    })

    await this.courseRepository.studentCourseCreate({
      student_id: studentInfo.id,
      course_id: Number(findCourse.id),
    })
  }

  async studentAlreadyIn(code: string, userId: number) {
    const findInCourse = await this.studentsRepository.studentCourseFindOne({
      where: {
        course: {
          code_class: code,
        },
        student: {
          user_id: userId,
        },
      },
    })

    return findInCourse
  }
}
