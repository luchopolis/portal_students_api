import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthDto } from 'src/auth/dto/auth-dto'
import { Role } from 'src/common/types/roles.enum'
import { HashingPassword } from 'src/common/utils/hashing-password.utils'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private hashService: HashingPassword,
  ) {}

  async signIn(authDto: AuthDto, typeRole: Role) {
    const userData = await this.userService.findSignIn(authDto, typeRole)

    const { password } = authDto
    if (!userData) {
      throw new NotFoundException('User Not Found')
    }

    const checkPassword = await this.hashService.comparePwd(
      password,
      userData.password,
    )

    if (!checkPassword) throw new UnauthorizedException('Invalid Credentials')

    const payloadJwt = {
      sub: userData.id,
      email: userData.email,
      picture: userData.picture,
      role: {
        id: userData.roles.id,
        name: userData.roles.name,
      },
    }

    return {
      access_token: await this.jwtService.signAsync(payloadJwt, {
        expiresIn: '30d',
      }),
    }
  }
}
