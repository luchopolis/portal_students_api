import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EnvConfiguration } from './config/env.config'
import { CommonModule } from './common/common.module'
import { TeachersModule } from './teachers/teachers.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { CourseModule } from './course/course.module'
import { StudentModule } from './student/student.module'

import { globalModules } from './config/global-modules'
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
      global: true,
      inject: [ConfigService],
    }),
    CommonModule,
    TeachersModule,
    AuthModule,
    UsersModule,
    CourseModule,
    StudentModule,
    ...globalModules,
    OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
