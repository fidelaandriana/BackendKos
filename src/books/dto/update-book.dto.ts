import { IsString, IsIn } from 'class-validator';

export class UpdateBookStatusDto {
  @IsString()
  @IsIn(['PENDING', 'ACCEPT', 'REJECT'])
  status: string;
}