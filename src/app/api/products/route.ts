import { NextRequest, NextResponse } from "next/server";
import { ProductsService } from "@/app/services/Products.service";
import Products from "@/app/entities/Products";
import { getDataSource } from "@/app/DataSource"; // Importa getDataSource

export const POST = async (req: NextRequest) => {
  try {
    const dataSource = await getDataSource();
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
    const dataSource = await getDataSource();
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
    const dataSource = await getDataSource();
    const productData: Products = await req.json();
    const productsService = new ProductsService(dataSource);

    let updatedProduct: Products | null = null;

    const productId = req.nextUrl.pathname.split("/").pop();

    if (productId && !isNaN(Number(productId))) {
      updatedProduct = await productsService.updateProduct(
        Number(productId),
        productData
      );
    } else {
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
