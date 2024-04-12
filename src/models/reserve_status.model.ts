import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ReserveStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  count_of: number;
}
