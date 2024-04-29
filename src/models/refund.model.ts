import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Booking } from './booking.model';

@Entity()
export class Refund {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Booking)
  @JoinColumn()
  booking: Booking;

  @Column('decimal')
  sum: number;

  @Column()
  created_at: Date;
}
