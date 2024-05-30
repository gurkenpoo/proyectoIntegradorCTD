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

  // Puedes agregar otros métodos del servicio aquí, como updateProduct, deleteProduct, etc.
}
