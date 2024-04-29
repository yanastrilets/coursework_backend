import { Column, ManyToOne } from "typeorm";
import { User } from "../../models/user.model";
import { Apartment } from "../../models/apartment.model";

export class CreateReviewDto {

  userId: number;

  bookingId: number;

  created_at: Date;

  review: number; // оцінка
}
