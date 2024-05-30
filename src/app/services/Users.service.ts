import { DataSource } from "typeorm";
import { UsersDAO } from "../dao/Users.dao";
import Users from "../entities/Users";
import bcrypt from "bcrypt"; // Importa la librería bcrypt

export class UsersService {
  private usersDAO: UsersDAO;

  constructor(dataSource: DataSource) {
    this.usersDAO = new UsersDAO(dataSource);
  }

  async getAllUsers(): Promise<Users[]> {
    return await this.usersDAO.findAll();
  }

  async getUserById(id: number): Promise<Users | null> {
    return await this.usersDAO.findById(id);
  }

  async createUser(userData: Omit<Users, "id">): Promise<Users> {
    // 1. Hashea la contraseña
    const saltRounds = 10; // Puedes ajustar el número de rondas (10 es un buen valor)
    const hashedPassword = await bcrypt.hash(userData.contrasena, saltRounds);

    // 2. Crea el usuario con la contraseña hasheada
    const newUser = await this.usersDAO.create({
      ...userData, // Copia los demás datos del usuario
      contrasena: hashedPassword, // Reemplaza la contraseña con el hash
    });

    return newUser;
  }

  // ... otros métodos del servicio (updateUser, deleteUser, etc.)
}
