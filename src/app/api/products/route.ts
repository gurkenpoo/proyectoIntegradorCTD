import { NextRequest, NextResponse } from "next/server";
import { ProductsService } from "@/app/services/Products.service";
import Products from "@/app/entities/Products";
import { initializeDataSource } from "@/app/DataSource";

export const POST = async (req: NextRequest) => {
  try {
    const dataSource = await initializeDataSource();
    const productData: Omit<Products, "id"> = await req.json();
    const productsService = new ProductsService(dataSource);
    const newProduct = await productsService.createProduct(productData);
    return NextResponse.json(
      {
        message: "Producto creado correctamente",
        product: newProduct,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const dataSource = await initializeDataSource();
    const productsService = new ProductsService(dataSource);
    const products = await productsService.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
};
