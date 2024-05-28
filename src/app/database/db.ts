import { createConnection, getConnectionOptions } from "typeorm";

export const connectDatabase = async () => {
  const connectionOptions = await getConnectionOptions();
  return createConnection(connectionOptions);
};