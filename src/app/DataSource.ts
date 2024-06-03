import { DataSource } from "typeorm";
import Products from "./entities/Products";
import Users from "./entities/Users";

// La instancia DataSource
let dataSource: DataSource;

// Inicializa la fuente de datos
export const initializeDataSource = async () => {
  if (!dataSource) {
    // Solo inicializa si dataSource no está definido
    dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "akatosh",
      password: "tierra",
      database: "carmenere",
      entities: [Products, Users],
      synchronize: true, // ¡Cuidado en producción!
      logging: true,
    });

    try {
      await dataSource.initialize();
      console.log("Conexión a la base de datos exitosa");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error; // Re-lanza el error para que la aplicación lo maneje
    }
  }

  return dataSource;
};

export const getDataSource = () => dataSource; // No se necesita await aquí
