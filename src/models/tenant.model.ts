import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.model';
import { Person } from './person.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  count_of_booking: number;

  @Column()
  passport_info: string;

  @OneToOne(() => Person, {cascade: true})
  @JoinColumn()
  person: Person;
}
