import Products from "@/app/entities/products"
import {DataSourceOptions, getConnectionManager } from "typeorm"
import { getRepository } from "typeorm"

async function startApp(){
    try{
        const connectionManager = getConnectionManager();
        const connection = connectionManager.create({
            // configuracion de bbdd
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "carmenere",
            entities: [Products],
            synchronize: true,
            logging: true
        } as DataSourceOptions);
        
        await connection.initialize();
        console.log("TypeORM connectado");

        try {
            const userRepository = getRepository(Products);
            const products = await userRepository.find();

            console.log(products)
        } catch(error){
            console.error("error fetching:", error)
        }
    } catch(error){
        console.error("error conectando a la base de datos:", error)
    }
}

startApp()