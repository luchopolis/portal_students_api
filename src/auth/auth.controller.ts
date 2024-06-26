import { Body, Controller, Post, Request, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from 'src/auth/dto/auth-dto'
// import { AuthGuard } from './auth.guard'
// import { Roles } from 'src/common/decorators/role.decorator'
import { Role } from 'src/common/types/roles.enum'
// import { RoleGuard } from 'src/common/guards/role.guard'
import { Auth } from './decorators/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login-teacher')
  async signIn(@Body() data: AuthDto) {
    const { access_token } = await this.authService.signIn(data, Role.Teacher)
    return { jwt: access_token }
  }

  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles(Role.Admin, Role.Teacher)
  @Auth(Role.Admin, Role.Teacher)
  @Get('testing')
  async testing(@Request() req) {
    return req.user
  }

  @Post('login-student')
  async signInStudent(@Body() data: AuthDto) {
    const { access_token } = await this.authService.signIn(data, Role.Student)
    return { jwt: access_token }
  }
}
