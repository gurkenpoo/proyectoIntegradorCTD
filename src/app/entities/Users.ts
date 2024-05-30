import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  contrasena: string;

  @Column({ default: "usuario" }) // Valor por defecto 'usuario'
  tipo: string;
}
