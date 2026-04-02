import { PartialType } from '@nestjs/mapped-types';
import { CreateKostImageDto } from './create-kost_image.dto';

export class UpdateKostImageDto extends PartialType(CreateKostImageDto) {}
