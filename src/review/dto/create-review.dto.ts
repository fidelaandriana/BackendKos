import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  kos_id: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
