import { Injectable } from '@nestjs/common'
import { IBaseEmailProvider } from '../interfaces/BaseEmailProvider'

@Injectable()
export class LocalProviderEmail implements IBaseEmailProvider {
  sendMail(): void {
    console.log('Send VIA LOCAL')
  }
}
