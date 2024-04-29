import { Column, JoinColumn, OneToOne } from "typeorm";
import { Booking } from "../../models/booking.model";

export class CreateRefundDto {

  bookingId: number;

  sum: number;

  created_at: Date;
}
