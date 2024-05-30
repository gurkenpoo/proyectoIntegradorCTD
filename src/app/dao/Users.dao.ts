import { DataSource, Repository } from "typeorm";
import Users from "../entities/Users";

export class UsersDAO {
  private usersRepository: Repository<Users>;

  constructor(dataSource: DataSource) {
    this.usersRepository = dataSource.getRepository(Users);
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(userData: Omit<Users, "id">): Promise<Users> {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  // Puedes agregar otros métodos DAO aquí, como update, delete, etc.
}
