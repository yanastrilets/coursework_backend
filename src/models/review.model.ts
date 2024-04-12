import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { Apartment } from './apartment.model';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Apartment)
  apartment: Apartment;

  @Column()
  created_at: Date;

  @Column()
  review: number; // оцінка
}
