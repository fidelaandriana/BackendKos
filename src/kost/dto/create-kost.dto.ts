import { IsString, IsNotEmpty, IsInt, IsIn } from 'class-validator';

export class CreateKostDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsInt()
  price_per_month: number;

  @IsString()
  @IsIn(['MALE', 'FEMALE', 'ALL'])
  gender: string;
}
