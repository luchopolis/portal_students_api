import { Module } from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseController } from './course.controller'
import { CommonModule } from 'src/common/common.module'
import { CourseRepository } from './course.repository'
import { ConfigModule } from '@nestjs/config'
import { CourseUtils } from './utils/course.utils'

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, CourseUtils],
})
export class CourseModule {}
