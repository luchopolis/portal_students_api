import { Injectable } from '@nestjs/common'
import { Prisma, user } from '@prisma/client'
import { PrismaService } from 'src/common/providers/db.provider'

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(params: { data: Prisma.userCreateInput }): Promise<user> {
    const { data } = params
    return this.prismaService.user.create({ data })
  }

  async findFirst(args: Prisma.userFindFirstArgs): Promise<
    user & {
      roles?: {
        id: number
        name: string
      }
    }
  > {
    return this.prismaService.user.findFirst(args)
  }
}
