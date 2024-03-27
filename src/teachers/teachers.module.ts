import { Module } from '@nestjs/common'
import { TeachersService } from './teachers.service'
import { TeachersController } from './teachers.controller'
import { CommonModule } from 'src/common/common.module'

@Module({
  imports: [CommonModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
