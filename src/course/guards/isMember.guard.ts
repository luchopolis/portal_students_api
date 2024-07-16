import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { PrismaService } from 'src/common/providers/db.provider'
import { ITokenUser } from 'src/common/types/interfaces'

import { Request } from 'express'
import { RoleIds } from 'src/common/types/roles.enum'

@Injectable()
export class MemberOfCourseGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // access to user
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()

    const userToken: ITokenUser = context.switchToHttp().getRequest().user

    const params = request.params as unknown as { courseId: number } // courseId

    // if is student
    if (userToken.role.id === RoleIds.student) {
      const checkUserEnrolled =
        await this.prismaService.student_course.findFirst({
          where: {
            course_id: Number(params.courseId),
            student: {
              user_id: Number(userToken.sub),
            },
          },
        })

      if (!checkUserEnrolled)
        throw new ForbiddenException('You are not enrolled in this course')
    }

    // if is teacher
    if (userToken.role.id === RoleIds.teacher) {
      const checkOwnerCourse = await this.prismaService.courses.findFirst({
        where: {
          teachersId: Number(userToken.sub),
          id: Number(params.courseId),
        },
      })

      if (!checkOwnerCourse)
        throw new ForbiddenException('You are not the owner')
    }

    return true // can continue to update the course
  }
}
