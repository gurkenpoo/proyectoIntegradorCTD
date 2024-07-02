import { DataSource, In, Repository } from "typeorm";
import { ReserveDAO } from "../dao/Reserve.dao";
import Reserve from "../entities/Reserve";
import { ReserveInt } from "@/interfaces/ReserveInt";

export class ReserveService {
  private reserveDAO: ReserveDAO;
  private reserveRepository: Repository<Reserve>; // Agrega el repositorio

  constructor(dataSource: DataSource) {
    this.reserveDAO = new ReserveDAO(dataSource);
    this.reserveRepository = dataSource.getRepository(Reserve); // Inicializa el repositorio
  }

  async getAllReserves(): Promise<ReserveInt[]> {
    const reserves = await this.reserveDAO.findAll();
    return reserves.map((reserve) => ({
      id: reserve.id,
      product: reserve.product,
      user: reserve.user,
      reservedDates: reserve.reservedDates,
    }));
  }

  async getReserveById(id: number): Promise<ReserveInt | null> {
    const reserve = await this.reserveDAO.findById(id);
    if (reserve) {
      return {
        id: reserve.id,
        product: reserve.product,
        user: reserve.user,
        reservedDates: reserve.reservedDates,
      };
    }
    return null;
  }
  async getReservesByProductId(productId: number): Promise<ReserveInt[]> {
    const reserves = await this.reserveRepository.find({
      // Usa el repositorio directamente
      where: { product: { id: productId } },
      relations: ["product", "user"],
    });
    return reserves.map((reserve: Reserve) => ({
      // Especifica el tipo de 'reserve'
      id: reserve.id,
      product: reserve.product,
      user: reserve.user,
      reservedDates: reserve.reservedDates,
    }));
  }
  async createReserve(reserveData: Omit<Reserve, "id">): Promise<Reserve> {
    return await this.reserveDAO.create(reserveData);
  }
  async getReservedDatesInRange(
    productId: number,
    startDate: string,
    endDate: string
  ): Promise<string[]> {
    const reserves = await this.reserveRepository.find({
      where: {
        product: { id: productId },
        reservedDates: In([startDate, endDate]),
      },
    });

    return reserves.flatMap((reserve) => reserve.reservedDates);
  }
}
