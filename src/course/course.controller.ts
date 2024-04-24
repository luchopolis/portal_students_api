import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Role } from 'src/common/types/roles.enum'

import { ITokenUser } from 'src/common/types/interfaces'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Course } from './entities/course.entity'
import { OwnerCourseGuard } from './guards/owner.guard'

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Auth(Role.Teacher)
  @Post()
  @ApiResponse({ status: 200, description: 'New Course', type: Course })
  create(@Request() req, @Body() createCourseDto: CreateCourseDto) {
    const user: ITokenUser = req.user

    return this.courseService.create({
      dataCourseDto: createCourseDto,
      teacherId: user.sub,
    })
  }

  @Auth(Role.Teacher)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'New Course',
    type: Course,
    isArray: true,
  })
  findAll(
    @Request() req,
    @Query('take') take: number,
    @Query('skip') skip?: number,
  ) {
    const userId: ITokenUser = req.user
    return this.courseService.findAll(userId.sub, { skip, take })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id)
  }

  @UseGuards(OwnerCourseGuard)
  @Auth(Role.Teacher)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update Course',
    type: Course,
  })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id)
  }
}
