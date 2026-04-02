import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateKostImageDto {
  @IsInt()
  @IsNotEmpty()
  kos_id: number;

  @IsString()
  @IsNotEmpty()
  file: string; 
}
