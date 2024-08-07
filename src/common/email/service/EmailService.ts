import { Inject, Injectable } from '@nestjs/common'
import { IBaseEmailProvider } from '../interfaces/BaseEmailProvider'

@Injectable()
export class EmailNotificationService {
  constructor(@Inject('EmailProvider') private provider: IBaseEmailProvider) {
    this.provider = provider
  }
  setStrategy(provider: IBaseEmailProvider) {
    this.provider = provider
  }
  async notify(params: { to: string; message: string }) {
    await this.provider.sendMail(params)
  }
}
