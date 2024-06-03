import { DataSource, Repository } from "typeorm";
import Category from "../entities/Category";

export class CategoryDAO {
  private categoryRepository: Repository<Category>;

  constructor(dataSource: DataSource) {
    this.categoryRepository = dataSource.getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.categoryRepository.findOneBy({ name });
  }

  async create(categoryName: string): Promise<Category> {
    const newCategory = this.categoryRepository.create({ name: categoryName });
    return await this.categoryRepository.save(newCategory);
  }
  // Puedes agregar otros métodos DAO aquí, como update, delete, etc.
}
