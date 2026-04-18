import { Module } from '@nestjs/common';
import { KostFacilityService } from './kost_facility.service';
import { KostFacilityController } from './kost_facility.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KostFacilityController],
  providers: [KostFacilityService],
})
export class KostFacilityModule {}
