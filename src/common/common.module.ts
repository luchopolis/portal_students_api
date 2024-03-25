import { Module } from '@nestjs/common'
import { PrismaService } from './providers/db.provider'
import { HashingPassword } from './utils/hashing-password.utils'

@Module({
  providers: [PrismaService, HashingPassword],
  exports: [PrismaService, HashingPassword],
})
export class CommonModule {}
