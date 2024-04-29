import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReserveStatusDto {
  @IsString()
  reserve_status: string;

  @IsNumber()
  count_of: number;
}
