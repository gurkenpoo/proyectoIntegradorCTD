import { DataSource } from "typeorm";
import { UsersDAO } from "../dao/Users.dao";
import Users from "../entities/Users";
import bcrypt from "bcrypt";

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

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.usersDAO.findByEmail(email);
  }

  async createUser(userData: Omit<Users, "id">): Promise<Users> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.contrasena, saltRounds);

    const newUser = await this.usersDAO.create({
      ...userData,
      contrasena: hashedPassword,
    });

    return newUser;
  }
}
