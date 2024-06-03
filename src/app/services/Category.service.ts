import { DataSource } from "typeorm";
import { CategoryDAO } from "../dao/Category.dao";
import Category from "../entities/Category";

export class CategoryService {
  private categoryDAO: CategoryDAO;

  constructor(dataSource: DataSource) {
    this.categoryDAO = new CategoryDAO(dataSource);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryDAO.findAll();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await this.categoryDAO.findById(id);
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    return await this.categoryDAO.findByName(name);
  }

  async createCategory(categoryName: string): Promise<Category> {
    return await this.categoryDAO.create(categoryName);
  }
}
