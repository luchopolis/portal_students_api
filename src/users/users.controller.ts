import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Role } from 'src/common/types/roles.enum'
import { ITokenUser } from 'src/common/types/interfaces'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE ME Endpoint retrieve info from the user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Auth(Role.Admin, Role.Student, Role.Teacher)
  @Get('me')
  async me(@Request() req) {
    const user: ITokenUser = req.user
    const userId = user.sub

    const userData = await this.usersService.findOne(userId, {
      id: true,
      picture: true,
      role_id: true,
      roles: true,
    })
    return { data: userData }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
