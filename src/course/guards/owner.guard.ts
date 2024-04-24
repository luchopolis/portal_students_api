import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Request } from 'express'

import { PrismaService } from 'src/common/providers/db.provider'
import { ITokenUser } from 'src/common/types/interfaces'

@Injectable()
export class OwnerCourseGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // access to user
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()

    const userToken: ITokenUser = context.switchToHttp().getRequest().user

    const params = request.params as unknown as { id: number } // courseId

    const checkOwnerCourse = await this.prismaService.courses.findFirst({
      where: {
        teachersId: Number(userToken.sub),
        id: Number(params.id),
      },
    })

    if (!checkOwnerCourse) throw new ForbiddenException('You are not the owner')
    return true // can continue to update the course
  }
}
