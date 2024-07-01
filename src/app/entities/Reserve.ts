import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Product from "./Products";
import User from "./Users";

@Entity()
export default class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.reserves, { nullable: false })
  product: Product;

  @ManyToOne(() => User, (user) => user.reserves, { nullable: false })
  user: User;

  @Column("text", { array: true, nullable: true })
  reservedDates: string[];
}
