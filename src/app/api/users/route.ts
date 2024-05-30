import { NextRequest, NextResponse } from "next/server";
import { UsersService } from "@/app/services/Users.service";
import Users from "@/app/entities/Users";
import { initializeDataSource } from "@/app/DataSource";

// Define una función para cada método HTTP
export async function POST(req: NextRequest) {
  // <-- Define POST así
  try {
    const dataSource = await initializeDataSource();
    const userData: Omit<Users, "id"> = await req.json();
    const usersService = new UsersService(dataSource);
    const newUser = await usersService.createUser(userData);
    return NextResponse.json(
      { message: "Usuario creado correctamente", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return NextResponse.json(
      { error: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // <-- Define GET así
  try {
    const dataSource = await initializeDataSource();
    const usersService = new UsersService(dataSource);
    const users = await usersService.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
}
