import { Injectable } from '@nestjs/common'
import { IBaseEmailProvider } from '../interfaces/BaseEmailProvider'

@Injectable()
export class ProviderExternal implements IBaseEmailProvider {
  sendMail(): void {
    console.log('Send VIA HTTP MAIL')
  }
}
