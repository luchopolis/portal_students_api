import { Module } from '@nestjs/common';
import { PrismaService } from './providers/db.provider';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
