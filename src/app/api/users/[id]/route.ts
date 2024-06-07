import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/app/DataSource";
import Users from "@/app/entities/Users";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository(Users);
    const userId = parseInt(params.id, 10);

    const updatedUserData = await req.json();

    const updatedUser = await userRepository.update(userId, updatedUserData);

    if (updatedUser.affected === 1) {
      return NextResponse.json(
        { message: "Usuario actualizado correctamente" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json(
      { error: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
};
