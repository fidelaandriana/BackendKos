import { Module } from '@nestjs/common';
import { KostFacilityService } from './kost_facility.service';
import { KostFacilityController } from './kost_facility.controller';

@Module({
  controllers: [KostFacilityController],
  providers: [KostFacilityService],
})
export class KostFacilityModule {}
