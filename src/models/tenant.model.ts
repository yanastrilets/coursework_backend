import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from './user.model';
import { Person } from './person.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({nullable:true})
  count_of_booking: number;


  @OneToOne(() => Person, {cascade: true, eager: true})
  @JoinColumn()
  person: Person;
}
