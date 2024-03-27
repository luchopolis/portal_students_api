import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthDto } from '../auth/dto/auth-dto'

import { UsersRepository } from './users.repository'
import { Role, RoleIds } from 'src/common/types/roles.enum'
import { Prisma } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number, selectFields?: Prisma.userSelect) {
    return this.userRepository.findFirst({
      select: selectFields,
      where: { id: Number(id) },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  async findSignIn(auth: AuthDto, typeRole: Role) {
    const { email } = auth

    const userData = await this.userRepository.findFirst({
      include: {
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        email,
        roles: {
          id: RoleIds[typeRole],
        },
      },
    })
    return userData
  }
}
