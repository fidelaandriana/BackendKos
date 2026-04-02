import { PartialType } from '@nestjs/mapped-types';
import { CreateKostFacilityDto } from './create-kost_facility.dto';

export class UpdateKostFacilityDto extends PartialType(CreateKostFacilityDto) {}
