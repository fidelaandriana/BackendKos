import { Module } from '@nestjs/common';
import { KostImageService } from './kost_image.service';
import { KostImageController } from './kost_image.controller';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [KostImageController],
  providers: [KostImageService],
})
export class KostImageModule {}
