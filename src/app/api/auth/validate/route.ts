// pages/api/auth/validate.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import config from "../login/config.json";
import { UsersService } from "@/app/services/Users.service";
import { initializeDataSource } from "@/app/DataSource";

export const POST = async (req: NextRequest) => {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, config.jwtSecret) as {
      userId: number;
      email: string;
    };

    const dataSource = await initializeDataSource();
    const usersService = new UsersService(dataSource);

    // Buscar el usuario en la base de datos
    const user = await usersService.getUserById(decodedToken.userId);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    // Devolver la información del usuario
    return NextResponse.json({
      userId: user.id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido, // Agregar más campos si es necesario
    });
  } catch (error) {
    console.error("Error al validar el token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
};
