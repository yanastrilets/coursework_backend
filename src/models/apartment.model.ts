import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Address } from './address.model';
import { Landlord } from './landlord.model';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  house_name: string;

  @OneToOne(() => Address, {cascade: true, eager: true})
  @JoinColumn()
  address: Address;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 1 })
  price_per_night: number;

  @Column('decimal', { precision: 10, scale: 1, nullable: true })
  final_price: number;

  @Column()
  count_of_room: number;

  @Column()
  count_of_bathroom: number;

  @Column()
  count_of_kitchen: number;

  @ManyToOne(() => Landlord, {cascade: true, eager: true})
  landlord: Landlord;

  @Column('text', { array: true, default: () => "array[]::text[]" , nullable: true})
  photos: string[];
}
