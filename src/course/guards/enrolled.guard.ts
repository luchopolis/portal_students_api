import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { PrismaService } from 'src/common/providers/db.provider'
import { ITokenUser } from 'src/common/types/interfaces'

import { Request } from 'express'

@Injectable()
export class StudentEnrolledGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // access to user
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()

    const userToken: ITokenUser = context.switchToHttp().getRequest().user

    const params = request.params as unknown as { id: number } // courseId

    const checkUserEnrolled = await this.prismaService.student_course.findFirst(
      {
        where: {
          course_id: Number(params.id),
          student: {
            user_id: Number(userToken.sub),
          },
        },
      },
    )

    if (!checkUserEnrolled)
      throw new ForbiddenException('You are not enrolled to this course')
    return true // can continue to update the course
  }
}
