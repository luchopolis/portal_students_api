import { Module } from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseController } from './course.controller'
import { CommonModule } from 'src/common/common.module'
import { CourseRepository } from './course.repository'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
