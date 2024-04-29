import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ReserveStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reserve_status: string;

  @Column()
  count_of: number;
}
