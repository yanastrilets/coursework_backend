import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avenue: string;

  @Column()
  number_of_house: number;

  @Column()
  number_of_flat: number;

  @Column()
  city: string;

  @Column()
  country: string;
}
