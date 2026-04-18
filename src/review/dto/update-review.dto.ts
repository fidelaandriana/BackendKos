import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
}