import { Injectable } from '@nestjs/common'
import { IBaseEmailProvider } from '../interfaces/BaseEmailProvider'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class ProviderExternal implements IBaseEmailProvider {
  constructor(private readonly httpService: HttpService) {}

  async sendMail(params: { to: string; message: string }): Promise<void> {
    try {
      // TODO: Change with an env variable
      await this.httpService.axiosRef.post(
        'http://127.0.0.1:3003/api/send-mail',
        {
          to: params.to,
          message: params.message,
        },
      )
    } catch (error) {
      console.log(error)
    }
  }
}
