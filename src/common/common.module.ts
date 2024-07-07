import { Module } from '@nestjs/common'
import { PrismaService } from './providers/db.provider'
import { HashingPassword } from './utils/hashing-password.utils'
import { EmailNotificationService } from './email/service/EmailService'
import { ProviderExternal } from './email/providers/ProviderExternal'
import { LocalProviderEmail } from './email/providers/LocalProviderEmail'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [
    PrismaService,
    HashingPassword,
    {
      provide: 'EmailProvider',
      useClass: ProviderExternal,
    },
    EmailNotificationService,
    LocalProviderEmail,
  ],
  exports: [
    PrismaService,
    HashingPassword,
    EmailNotificationService,
    LocalProviderEmail,
  ],
})
export class CommonModule {}
