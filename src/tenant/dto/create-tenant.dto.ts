import { User } from "../../models/user.model";
import { Column, JoinColumn, OneToOne } from "typeorm";
import { Person } from "../../models/person.entity";
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";

export class CreateTenantDto {
  //юзер
  userId:number;

  count_of_booking: number;
  passport_info: string;

  //person
  name: string;
  surname: string;
  date_of_birth: Date;
  phone: string;
  email: string;
}
