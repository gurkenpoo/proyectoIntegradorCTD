import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column("text", { array: true })
  imageUrls: string[];

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  originalPrice: number;

  @Column({ nullable: true })
  discountPrice: number;

  @Column({ nullable: false })
  category: string;
}
