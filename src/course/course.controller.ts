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
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common'
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Role } from 'src/common/types/roles.enum'

import { ITokenUser } from 'src/common/types/interfaces'
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import { Course } from './entities/course.entity'
import { OwnerCourseGuard } from './guards/owner.guard'
import { EmailNotificationService } from 'src/common/email/service/EmailService'
import { LocalProviderEmail } from 'src/common/email/providers/LocalProviderEmail'

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly emailService: EmailNotificationService,
    private readonly localProviderEmail: LocalProviderEmail,
  ) {}

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
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Course),
          },
        },
      },
    },
  })
  async findAll(
    @Request() req,
    @Query('take') take: number,
    @Query('skip') skip?: number,
  ) {
    const userId: ITokenUser = req.user
    const result = await this.courseService.findAll(userId.sub, { skip, take })
    this.emailService.setStrategy(this.localProviderEmail)
    this.emailService.notify()
    return {
      data: result,
    }
  }

  @Get('students-enrolled')
  @Auth(Role.Student)
  @ApiResponse({
    status: 200,
    description: 'New Course',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Course),
          },
        },
      },
    },
  })
  async studentsCourses(
    @Request() req,
    @Query('take') take: number,
    @Query('skip') skip?: number,
  ) {
    const userId: ITokenUser = req.user
    const result = await this.courseService.studentCourse(userId.sub, {
      skip,
      take,
    })
    return { data: result }
  }

  @UseGuards(OwnerCourseGuard)
  @Auth(Role.Teacher)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Course Teacher Details',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Course),
          },
        },
      },
    },
  })
  async courseTeacherDetail(@Param('id') id: string) {
    const result = await this.courseService.findOne({ where: { id: +id } })
    return result
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
    return { data: this.courseService.update(+id, updateCourseDto) }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id)
  }

  @Auth(Role.Student)
  @Post('join')
  async joinCourse(@Request() req, @Body() data: { code: string }) {
    const { sub: userId }: ITokenUser = req.user
    const { code } = data

    const checkStudentInCourse = await this.courseService.studentAlreadyIn(
      code,
      userId,
    )

    if (checkStudentInCourse) {
      throw new BadRequestException('You Are Already in this course')
    }

    await this.courseService.joinUserInCourse(code, userId)
    return { message: 'Success' }
  }
}
