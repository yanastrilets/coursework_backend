import { IsNotEmpty, IsString, Length, IsOptional, IsNumber } from "class-validator";

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'Avenue name must be between 2 and 50 characters.' })
  avenue?: string;

  @IsNotEmpty({ message: 'House number is required.' })
  @IsNumber() // Ensure the house number is numeric
  number_of_house: number;

  @IsOptional()
  @IsNumber() // Allow optional flat number with type validation
  number_of_flat?: number;

  @IsNotEmpty({ message: 'City name is required.' })
  @IsString()
  @Length(2, 50, { message: 'City name must be between 2 and 50 characters.' })
  city: string;

  @IsNotEmpty({ message: 'Country name is required.' })
  @IsString()
  @Length(2, 50, { message: 'Country name must be between 2 and 50 characters.' })
  country: string;
}
