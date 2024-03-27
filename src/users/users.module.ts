import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { CommonModule } from 'src/common/common.module'
import { UsersRepository } from './users.repository'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
