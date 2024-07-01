import { NextResponse } from "next/server";
import { ReserveService } from "@/app/services/Reserve.service";
import { getDataSource } from "@/app/DataSource";

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    const dataSource = await getDataSource();
    const reserveService = new ReserveService(dataSource);
    const productId = Number(params.productId);

    const reserves = await reserveService.getReservesByProductId(productId);
    return NextResponse.json(reserves);
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return NextResponse.json(
      { error: "Error al obtener las reservas" },
      { status: 500 }
    );
  }
};
