import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateKostFacilityDto {
  @IsInt()
  @IsNotEmpty()
  kos_id: number;

  @IsString()
  @IsNotEmpty()
  facility: string;
}