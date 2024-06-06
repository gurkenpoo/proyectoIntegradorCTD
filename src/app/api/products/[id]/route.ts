import { NextRequest, NextResponse } from "next/server";

import Products from "@/app/entities/Products";
import { initializeDataSource } from "@/app/DataSource";
import { ProductsService } from "@/app/services/Products.service";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const dataSource = await initializeDataSource();
    const productId = parseInt(params.id, 10);
    const productData: Products = await req.json();
    const productsService = new ProductsService(dataSource);

    const updatedProduct = await productsService.updateProduct(
      productId,
      productData
    );

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

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const dataSource = await initializeDataSource();
    const productId = parseInt(params.id, 10);
    const productsService = new ProductsService(dataSource);

    const product = await productsService.getProductById(productId);

    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return NextResponse.json(
      { error: "Error al obtener el producto" },
      { status: 500 }
    );
  }
};
