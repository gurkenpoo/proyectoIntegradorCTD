import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;
}
