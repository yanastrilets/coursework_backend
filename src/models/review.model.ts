import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { Apartment } from './apartment.model';
import { Booking } from "./booking.model";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Booking)
  booking: Booking;

  @Column()
  created_at: Date;

  @Column()
  review: number; // оцінка
}
