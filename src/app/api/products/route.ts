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

export const PUT = async (req: NextRequest) => {
  try {
    const dataSource = await initializeDataSource();
    const productData: Products = await req.json();
    const productsService = new ProductsService(dataSource);

    let updatedProduct: Products | null = null;

    // Verificar si la URL contiene un ID de producto
    const productId = req.nextUrl.pathname.split("/").pop(); // Obtener el último segmento de la URL

    if (productId && !isNaN(Number(productId))) {
      // Si hay un ID numérico en la URL, actualizar por ID
      updatedProduct = await productsService.updateProduct(
        Number(productId),
        productData
      );
    } else {
      // Si no hay ID en la URL, asumir que se debe actualizar por nombre
      const productToUpdate = await productsService.getProductByName(
        productData.name
      );
      if (productToUpdate) {
        updatedProduct = await productsService.updateProduct(
          productToUpdate.id,
          productData
        );
      }
    }

    if (updatedProduct) {
      return NextResponse.json(
        {
          message: "Producto actualizado correctamente",
          product: updatedProduct,
        },
        {
          status: 200,
        }
      );
    } else {
      // Manejar el caso donde no se encuentra el producto
      return NextResponse.json(
        { error: "No se encontró el producto a actualizar" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
      { status: 500 }
    );
  }
};
