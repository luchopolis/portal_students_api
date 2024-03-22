import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthDto } from "src/users/dto/auth-dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto) {
    const userData = await this.userService.findSignIn(authDto);

    const { password } = authDto;
    if (!userData) {
      throw new NotFoundException("User Not Found");
    }

    if (userData.password !== password)
      throw new UnauthorizedException("Invalid Credentials");

    const payloadJwt = {
      sub: userData.id,
      email: userData.email,
      picture: userData.picture,
      role: userData.roles.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payloadJwt, {
        expiresIn: "30d",
      }),
    };
  }
}
