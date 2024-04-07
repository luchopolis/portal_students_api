import { Injectable } from '@nestjs/common'

@Injectable()
export class CourseUtils {
  private dictionaryOptions =
    'ABCDEFGHIJKLMNOPRQSTUVWXYZabcdefghijklmnoprqstuvwxyz0123456789'

  private randomPosition = () =>
    Math.floor(Math.random() * this.dictionaryOptions.length)

  public generateCode(maxLength: number = 6) {
    let code = ''
    for (let character = 0; character <= maxLength; character++) {
      const ranPosition = this.randomPosition()
      code += this.dictionaryOptions[ranPosition]
    }
    return code
  }
}
