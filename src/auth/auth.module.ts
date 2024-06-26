import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from 'src/common/common.module'

@Module({
  imports: [ConfigModule, CommonModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
