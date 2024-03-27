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
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Role } from 'src/common/types/roles.enum'

import { ITokenUser } from 'src/common/types/interfaces'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Auth(Role.Teacher)
  @Post()
  create(@Request() req, @Body() createCourseDto: CreateCourseDto) {
    const user: ITokenUser = req.user

    return this.courseService.create({
      dataCourseDto: createCourseDto,
      teacherId: user.sub,
    })
  }

  @Get()
  findAll() {
    return this.courseService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id)
  }
}
