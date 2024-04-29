import { Tenant } from "../../models/tenant.model";
import { Column, ManyToOne } from "typeorm";
import { Apartment } from "../../models/apartment.model";
import { ReserveStatus } from "../../models/reserve_status.model";

export class CreateBookingDto {
  //tenant
  tenantId: number

  //apartment-address
  apartmentId: number

  //status
  reserve_status: string;

  created_at: Date;
  check_in: Date;
  check_out: Date;
  price: number;
}
