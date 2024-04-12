import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./user.role";


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  role: Role
}
