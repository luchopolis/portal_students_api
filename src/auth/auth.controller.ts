import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/users/dto/auth-dto";
import { AuthGuard } from "./auth.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { Role } from "src/common/types/roles.enum";
import { RoleGuard } from "src/common/guards/role.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login-admin")
  async signIn(@Body() data: AuthDto) {
    const { access_token } = await this.authService.signIn(data);
    return { jwt: access_token };
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Get("testing")
  async testing(@Request() req) {
    return req.user;
  }
}
