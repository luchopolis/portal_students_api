import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Request,
} from '@nestjs/common'
import { OtpService } from './otp.service'
import { JwtService } from '@nestjs/jwt'

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/generate')
  async generateOtp() {
    await this.otpService.saveOtp(1, '091819')
    return { message: 'success' }
  }

  @Post('/compare')
  async compareOtp(@Body() info: { code: string; jwt: string }) {
    const { jwt } = info

    const tokenInfo = this.jwtService.decode(jwt) as { userId: number }

    const value = await this.otpService.getOtp(tokenInfo.userId)
    if (value !== info.code.trim()) {
      throw new BadRequestException('Invalid Code')
    }
    return { message: 'success' }
  }
}
