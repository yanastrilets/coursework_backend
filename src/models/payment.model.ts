import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Booking } from './booking.model';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column('decimal')
  sum: number;

  @Column('decimal')
  sum_incomes: number;

  @OneToOne(() => Booking)
  @JoinColumn()
  booking: Booking;

  @Column()
  created_at: Date;
}
