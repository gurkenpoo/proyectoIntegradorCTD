import { DataSource } from "typeorm";
import Products from "./entities/Products";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "akatosh",
  password: "tierra",
  database: "carmenere",
  entities: [Products],
  synchronize: true,
});
