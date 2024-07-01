import { DataSource, Repository } from "typeorm";
import Reserve from "../entities/Reserve";
import Product from "../entities/Products";
import User from "../entities/Users";

export class ReserveDAO {
  private reserveRepository: Repository<Reserve>;

  constructor(dataSource: DataSource) {
    this.reserveRepository = dataSource.getRepository(Reserve);
  }

  async findAll(): Promise<Reserve[]> {
    return await this.reserveRepository.find({
      relations: ["product", "user"],
    });
  }

  async findById(id: number): Promise<Reserve | null> {
    return await this.reserveRepository.findOne({
      where: { id },
      relations: ["product", "user"],
    });
  }

  async create(reserveData: Omit<Reserve, "id">): Promise<Reserve> {
    if (!reserveData.product || !reserveData.user) {
      throw new Error(
        "La reserva debe tener un producto y un usuario asociados."
      );
    }

    const product = await this.reserveRepository.manager.findOne(Product, {
      where: { id: reserveData.product.id },
    });
    const user = await this.reserveRepository.manager.findOne(User, {
      where: { id: reserveData.user.id },
    });

    if (!product || !user) {
      throw new Error("Producto o usuario no encontrado.");
    }

    const newReserve = this.reserveRepository.create({
      ...reserveData,
      product: product,
      user: user,
    });

    return await this.reserveRepository.save(newReserve);
  }
}
