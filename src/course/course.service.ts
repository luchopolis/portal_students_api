import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CourseRepository } from './course.repository'
import { CourseUtils } from './utils/course.utils'
import { Prisma } from '@prisma/client'
import { StudentRepository } from 'src/student/student.repository'
import { ICourseParticipantsResponse } from './interfaces/response/list-participants'
import { TeacherRepository } from 'src/teachers/teacher.repository'

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly courseUtils: CourseUtils,
    private readonly studentsRepository: StudentRepository,
    private readonly teacherRepository: TeacherRepository,
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
          name: true,
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

  async reJoinStudent(params: { code: string; userId: number }) {
    await this.courseRepository.studentsCourseUpdate({
      where: {
        course: {
          code_class: params.code,
        },
        student: {
          user_id: params.userId,
        },
      },
      data: {
        active: true,
      },
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

  async membersInCourse(params: { courseId: number }) {
    const participants: Partial<ICourseParticipantsResponse> = {}

    const courseInfo = await this.courseRepository.findOne({
      where: {
        id: params.courseId,
      },
    })

    const students = await this.courseRepository.studentsInCourse({
      courseId: params.courseId,
    })

    const teacherInfo: {
      id: number
      name: string
      last_name: string
      code_teacher: string
      user_id: number
      created_at: Date
      updated_at: Date
      user?: {
        picture: string
      }
    } = await this.teacherRepository.findFirst({
      where: {
        user_id: courseInfo.teachersId,
      },
      include: {
        user: {
          select: {
            picture: true,
          },
        },
      },
    })

    participants.teachers = [
      {
        id: teacherInfo.id,
        picture: teacherInfo.user.picture,
        name: teacherInfo.name,
        last_name: teacherInfo.last_name,
      },
    ]

    participants.students = students.map((student) => {
      return {
        id: student.student.id,
        name: student.student.name,
        last_name: student.student.last_name,
        picture: student.student.user.picture,
      }
    })

    return participants
  }
}
