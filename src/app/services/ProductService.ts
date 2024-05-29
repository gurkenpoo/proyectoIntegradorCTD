import { AppDataSource } from "../DataSource";
import Products from "../entities/Products";

type CreateProductArgs = {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  originalPrice: number;
  discountPrice: number;
  category: string;
};
export class ProductsService {
  async createProduct(arg0: CreateProductArgs): Promise<Products> {
    const {
      id,
      name,
      description,
      imageUrls,
      originalPrice,
      discountPrice,
      category,
    } = arg0;
    const userRepository = AppDataSource.getRepository(Products);

    const producto = new Products();
    producto.id = id;
    producto.name = name;
    producto.description = description;
    producto.imageUrls = imageUrls;
    producto.originalPrice = originalPrice;
    producto.discountPrice = discountPrice;
    producto.category = category;
    const u = await userRepository.save(producto);
    return u;
  }
}
