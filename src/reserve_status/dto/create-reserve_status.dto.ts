import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReserveStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  countOf: number;
}
