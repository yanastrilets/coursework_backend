import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Address } from './address.model';
import { Landlord } from './landlord.model';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  house_name: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column('text')
  description: string;

  @Column('decimal')
  price_per_night: number;

  @Column()
  count_of_room: number;

  @Column()
  count_of_bathroom: number;

  @Column()
  count_of_kitchen: number;

  @ManyToOne(() => Landlord)
  landlord: Landlord;

  @Column()
  end_of_subscription: Date;
}
