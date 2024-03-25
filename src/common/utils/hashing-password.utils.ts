import { Injectable } from '@nestjs/common'

import * as bcrypt from 'bcrypt'

@Injectable()
export class HashingPassword {
  async hashPwd(passwordToHash: string) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(passwordToHash, salt)
  }

  async comparePwd(plainPwd: string, hashedPwd: string) {
    return bcrypt.compare(plainPwd, hashedPwd)
  }
}
