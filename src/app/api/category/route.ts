import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/app/services/Category.service";
import Category from "@/app/entities/Category";
import { getDataSource } from "@/app/DataSource"; // Importa getDataSource

// Define una función para cada método HTTP
export async function POST(req: NextRequest) {
  try {
    const dataSource = await getDataSource(); // Obtiene la conexión
    const categoryData: Omit<Category, "id"> = await req.json();
    const categoryService = new CategoryService(dataSource);
    const newCategory = await categoryService.createCategory(categoryData.name);
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
    const dataSource = await getDataSource(); // Obtiene la conexión
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
