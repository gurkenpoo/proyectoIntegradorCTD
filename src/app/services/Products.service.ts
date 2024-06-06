import { DataSource } from "typeorm";
import { ProductsDAO } from "../dao/Products.dao";
import Products from "../entities/Products";

export class ProductsService {
  private productsDAO: ProductsDAO;

  constructor(dataSource: DataSource) {
    this.productsDAO = new ProductsDAO(dataSource);
  }

  async getAllProducts(): Promise<Products[]> {
    return await this.productsDAO.findAll();
  }

  async getProductById(id: number): Promise<Products | null> {
    return await this.productsDAO.findById(id);
  }

  async createProduct(productData: Omit<Products, "id">): Promise<Products> {
    // Aquí puedes agregar validaciones de datos antes de crear el producto
    return await this.productsDAO.create(productData);
  }
  async updateProduct(
    id: number,
    productData: Products
  ): Promise<Products | null> {
    // Cambiar el tipo de retorno a 'Products | null'
    // Puedes agregar validaciones de datos antes de actualizar el producto
    return await this.productsDAO.update(id, productData);
  }
  async getProductByName(name: string): Promise<Products | null> {
    return await this.productsDAO.findByName(name);
  }

  // Puedes agregar otros métodos del servicio aquí, como updateProduct, deleteProduct, etc.
}
