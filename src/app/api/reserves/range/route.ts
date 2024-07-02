import { NextRequest, NextResponse } from "next/server";
import { ReserveService } from "@/app/services/Reserve.service";
import { getDataSource } from "@/app/DataSource";

export const GET = async (req: NextRequest) => {
  try {
    const dataSource = await getDataSource();
    const reserveService = new ReserveService(dataSource);
    const productId = Number(req.nextUrl.searchParams.get("productId"));
    const startDate = req.nextUrl.searchParams.get("startDate");
    const endDate = req.nextUrl.searchParams.get("endDate");

    if (productId && startDate && endDate) {
      const reservedDates = await reserveService.getReservedDatesInRange(
        productId,
        startDate,
        endDate
      );
      return NextResponse.json(reservedDates);
    } else {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return NextResponse.json(
      { error: "Error al obtener las reservas" },
      { status: 500 }
    );
  }
};
