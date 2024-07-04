import { Module } from '@nestjs/common'
import { StudentService } from './student.service'
import { StudentController } from './student.controller'
import { StudentRepository } from './student.repository'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from 'src/common/common.module'

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports: [StudentRepository],
})
export class StudentModule {}
