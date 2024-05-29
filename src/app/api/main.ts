import "reflect-metadata";
import { ProductsService } from "../services/ProductService";
import { AppDataSource } from "../DataSource";
import express, { Request } from "express";
import { CreateProductRequest } from "@/interfaces/CreateProductRequest";
import { ProductInt } from "@/interfaces/ProductInt";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "Hello API" });
});
app.post(
  "/api/producto",
  async (req: Request<undefined, ProductInt, CreateProductRequest>, res) => {
    try {
      const {
        id,
        name,
        description,
        imageUrls,
        originalPrice,
        discountPrice,
        category,
      } = req.body;

      const service = new ProductsService();
      const user = await service.createProduct({
        id,
        name,
        description,
        imageUrls,
        originalPrice,
        discountPrice,
        category,
      });

      res.send(user);
    } catch (error) {
      res.status(500).send();
    }
  }
);
AppDataSource.initialize()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  })
  .catch((error: any) => console.log(error));
