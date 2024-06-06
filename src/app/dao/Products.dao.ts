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
  async update(id: number, productData: Products): Promise<Products | null> {
    // Cambiar el tipo de retorno a 'Products | null'
    await this.productsRepository.update(id, productData);
    return this.productsRepository.findOneBy({ id }); // Devuelve el producto actualizado o null si no se encuentra
  }
  async findByName(name: string): Promise<Products | null> {
    return await this.productsRepository.findOneBy({ name });
  }

  // Puedes agregar otros métodos DAO aquí, como update, delete, etc.
}
