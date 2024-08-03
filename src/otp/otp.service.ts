import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class OtpService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async saveOtp(userId: number, otpCode: string) {
    await this.cacheManager.set(`otp:${userId}`, otpCode, 180000)
  }

  async getOtp(userId: number) {
    const otpValue = await this.cacheManager.get(`otp:${userId}`)
    return otpValue
  }
}
