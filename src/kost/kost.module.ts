import { Module } from '@nestjs/common';
import { KostService } from './kost.service';
import { KostController } from './kost.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KostController],
  providers: [KostService],
})
export class KostModule {}
