import { DataSource } from "typeorm";
import Users from "./entities/Users";
import Category from "./entities/Category";
import Products from "./entities/Products";
import Reserve from "./entities/Reserve";

// La instancia DataSource
let dataSource: DataSource | null = null; // Inicializar como null

// Inicializa la fuente de datos
export const initializeDataSource = async (): Promise<DataSource> => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "akatosh",
      password: "tierra",
      database: "carmenere",
      entities: [Products, Users, Category, Reserve],
      synchronize: true, // ¡Cuidado en producción!
      logging: true,
    });

    try {
      await dataSource.initialize();
      console.log("Conexión a la base de datos exitosa");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error; // Re-lanza el error
    }
  }

  // Asegurar que dataSource no sea null antes de retornarlo
  return dataSource;
};

export const getDataSource = async (): Promise<DataSource> => {
  if (!dataSource) {
    return await initializeDataSource();
  }
  return dataSource;
};
