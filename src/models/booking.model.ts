import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from './tenant.model';
import { Apartment } from './apartment.model';
import { ReserveStatus } from './reserve_status.model';
import { Status } from "./status";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant)
  tenant: Tenant;

  @ManyToOne(() => Apartment)
  apartment: Apartment;

  @Column()
  created_at: Date;

  @Column()
  status: Status;

  @Column()
  check_in: Date;

  @Column()
  check_out: Date;

  @Column('decimal')
  price: number;
}
