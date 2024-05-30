import { NextRequest, NextResponse } from "next/server";
import { UsersService } from "@/app/services/Users.service";
import { initializeDataSource } from "@/app/DataSource";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config.json"; // Importa el archivo JSON directamente

export async function POST(req: NextRequest) {
  try {
    const dataSource = await initializeDataSource();
    const { email, contrasena } = await req.json();
    const usersService = new UsersService(dataSource);

    const user = await usersService.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(contrasena, user.contrasena))) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    console.log("Inicio de sesión exitoso");
    return NextResponse.json(
      { message: "Inicio de sesión exitoso", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
