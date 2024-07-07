import { Injectable } from '@nestjs/common'
import { IBaseEmailProvider } from '../interfaces/BaseEmailProvider'

@Injectable()
export class LocalProviderEmail implements IBaseEmailProvider {
  async sendMail(params: { to: string; message: string }): Promise<void> {
    console.log('Send VIA LOCAL')
  }
}
