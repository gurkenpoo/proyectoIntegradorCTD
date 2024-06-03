import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/app/services/Category.service";
import Category from "@/app/entities/Category";
import { initializeDataSource } from "@/app/DataSource";

// Define una función para cada método HTTP
export async function POST(req: NextRequest) {
  try {
    const dataSource = await initializeDataSource();
    const categoryData: Omit<Category, "id"> = await req.json();
    const categoryService = new CategoryService(dataSource);
    const newCategory = await categoryService.createCategory(categoryData.name); // Obtiene el nombre de la categoría del body
    return NextResponse.json(
      { message: "Categoría creada correctamente", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    return NextResponse.json(
      { error: "Error al crear la categoría" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dataSource = await initializeDataSource();
    const categoryService = new CategoryService(dataSource);
    const categories = await categoryService.getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return NextResponse.json(
      { error: "Error al obtener las categorías" },
      { status: 500 }
    );
  }
}
