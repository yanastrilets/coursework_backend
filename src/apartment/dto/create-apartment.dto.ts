import { Column } from "typeorm";

export class CreateApartmentDto {

  house_name: string;
  description: string;
  price_per_night: number;
  count_of_room: number;
  count_of_bathroom: number;
  count_of_kitchen: number;

  //address
  avenue: string;
  number_of_house: number;
  number_of_flat: number;
  city: string;
  country: string;


  //landlord
  landlordId: number;
  photos: string[];
}
