import { Module } from '@nestjs/common';
import { KostImageService } from './kost_image.service';
import { KostImageController } from './kost_image.controller';

@Module({
  controllers: [KostImageController],
  providers: [KostImageService],
})
export class KostImageModule {}
