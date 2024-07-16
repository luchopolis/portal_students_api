import { Module } from '@nestjs/common'
import { TeachersService } from './teachers.service'
import { TeachersController } from './teachers.controller'
import { CommonModule } from 'src/common/common.module'
import { TeacherRepository } from './teacher.repository'

@Module({
  imports: [CommonModule],
  controllers: [TeachersController],
  providers: [TeachersService, TeacherRepository],
  exports: [TeacherRepository],
})
export class TeachersModule {}
