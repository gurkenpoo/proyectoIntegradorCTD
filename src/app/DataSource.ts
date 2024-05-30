import { DataSource } from "typeorm";
import Products from "../app/entities/Products"; // Ajusta la ruta si es necesario

let dataSource: DataSource | null = null;

export const initializeDataSource = async () => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "akatosh",
      password: "tierra",
      database: "carmenere",
      entities: [Products],
      synchronize: true, // ¡Cuidado en producción!
      logging: true,
    });

    await dataSource.initialize();
    console.log("Conexión a la base de datos exitosa");
  }

  return dataSource;
};

export const getDataSource = () => dataSource;
