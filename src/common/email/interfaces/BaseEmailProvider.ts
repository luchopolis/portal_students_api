export abstract class IBaseEmailProvider {
  abstract sendMail(params: { to: string; message: string }): Promise<void>
}
