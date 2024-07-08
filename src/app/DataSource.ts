import { DataSource } from "typeorm";
import Users from "./entities/Users";
import Category from "./entities/Category";
import Products from "./entities/Products";
import Reserve from "./entities/Reserve";

// La instancia DataSource
let dataSource: DataSource | null = null; // Inicializar como null
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://akatosh:tierra@localhost:5432/carmenere"; // Proporciona un valor por defecto si no está definida en producción

// Inicializa la fuente de datos
export const initializeDataSource = async (): Promise<DataSource> => {
  if (!dataSource) {
    dataSource = new DataSource({
      url: databaseUrl, // Solamente la URL
      type: "postgres",
      entities: [Products, Users, Category, Reserve],
      synchronize: false,
      logging: false,
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
