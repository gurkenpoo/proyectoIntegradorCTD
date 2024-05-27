import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "Products" })
    export default class Products {
    @PrimaryColumn()
    id: number;

    @Column({
    unique: true,
    nullable: false,})
    name: string;

    @Column("simple-array")
    imageUrls: string[];

    @Column({
    unique: false,
    nullable: false,})
    description: string;

    @Column({
    unique: false,
    nullable: false,})
    originalPrice: number;

    @Column({
    unique: false,
    nullable: true,})
    discountPrice: number;

    @Column({
    unique: false,
    nullable: false,})
    category: string;
}
