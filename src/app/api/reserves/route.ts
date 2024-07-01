import { NextRequest, NextResponse } from "next/server";
import { ReserveService } from "@/app/services/Reserve.service";
import Reserve from "@/app/entities/Reserve";
import { getDataSource } from "@/app/DataSource";

export const POST = async (req: NextRequest) => {
  try {
    const dataSource = await getDataSource();
    const reserveData: Omit<Reserve, "id"> = await req.json();
    const reserveService = new ReserveService(dataSource);
    const newReserve = await reserveService.createReserve(reserveData);
    return NextResponse.json(
      { message: "Reserva creada correctamente", reserve: newReserve },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    return NextResponse.json(
      { error: "Error al crear la reserva" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const dataSource = await getDataSource();
    const reserveService = new ReserveService(dataSource);
    const reserves = await reserveService.getAllReserves();
    return NextResponse.json(reserves);
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return NextResponse.json(
      { error: "Error al obtener las reservas" },
      { status: 500 }
    );
  }
};
