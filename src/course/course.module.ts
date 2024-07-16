import { Module } from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseController } from './course.controller'
import { CommonModule } from 'src/common/common.module'
import { CourseRepository } from './course.repository'
import { ConfigModule } from '@nestjs/config'
import { CourseUtils } from './utils/course.utils'
import { StudentModule } from 'src/student/student.module'
import { HttpModule } from '@nestjs/axios'
import { TeachersModule } from 'src/teachers/teachers.module'

@Module({
  imports: [ConfigModule, CommonModule, StudentModule, TeachersModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, CourseUtils],
})
export class CourseModule {}
