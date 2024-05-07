import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { Person } from './person.entity';

@Entity()
export class Landlord {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Person, {cascade: true, eager: true})
  @JoinColumn()
  person: Person;

  @Column({nullable: true})
  host_id: number
}
