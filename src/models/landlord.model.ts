import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Landlord {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Person)
  @JoinColumn()
  person: Person;
}
