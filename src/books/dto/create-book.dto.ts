import { IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsInt()
  @IsNotEmpty()
  kos_id: number;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;
}
