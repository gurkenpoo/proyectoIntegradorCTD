import { DataSource, Repository } from "typeorm";
import Products from "../entities/Products";

export class ProductsDAO {
  private productsRepository: Repository<Products>;

  constructor(dataSource: DataSource) {
    this.productsRepository = dataSource.getRepository(Products);
  }

  async findAll(): Promise<Products[]> {
    return await this.productsRepository.find();
  }

  async findById(id: number): Promise<Products | null> {
    return await this.productsRepository.findOneBy({ id });
  }

  async create(productData: Omit<Products, "id">): Promise<Products> {
    const newProduct = this.productsRepository.create(productData);
    return await this.productsRepository.save(newProduct);
  }

  // Puedes agregar otros métodos DAO aquí, como update, delete, etc.
}
