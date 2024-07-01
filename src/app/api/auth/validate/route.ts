// pages/api/auth/validate.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import config from "../login/config.json";

export const POST = async (req: NextRequest) => {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Obtener el token del header

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

    // Puedes hacer validaciones adicionales aquí, como verificar si el usuario existe en la base de datos

    return NextResponse.json({
      userId: decodedToken.userId,
      email: decodedToken.email,
    });
  } catch (error) {
    console.error("Error al validar el token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
};
