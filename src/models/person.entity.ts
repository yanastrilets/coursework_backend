import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  date_of_birth: Date;

  @Column()
  phone: string;

  @Column()
  email: string;

}
