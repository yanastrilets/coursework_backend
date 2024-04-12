import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsDate,
  IsPhoneNumber,
  Matches
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Surname must not be empty.' })
  surname: string;

  @IsDate({ message: 'Please provide a valid date for Date of Birth.' })
  @IsNotEmpty({ message: 'Date of Birth must not be empty.' })
  date_of_birth: Date;

  @IsString()
  @IsPhoneNumber(null, { message: 'Please provide a valid phone number.' }) // Validator depends on libphonenumber library
  phone: string;

  @IsNotEmpty({ message: 'Email must not be empty.' })
  @IsEmail({}, { message: 'Please provide a valid Email.' })
  email: string;
}
