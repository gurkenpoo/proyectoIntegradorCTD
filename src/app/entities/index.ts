import { NextApiRequest, NextApiResponse } from 'next';
import { getRepository } from 'typeorm';
import Products from "@/app/entities/products"
import { connectDatabase } from "../database/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDatabase();
  const productRepository = getRepository(Products);

  if (req.method === 'GET') {
    const products = await productRepository.find();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, imageUrls, description, originalPrice, discountPrice, category } = req.body;
    const product = new Products();
    product.name = name;
    product.imageUrls = imageUrls;
    product.description = description;
    product.originalPrice = originalPrice;
    product.discountPrice = discountPrice;
    product.category = category;

    await productRepository.save(product);
    res.status(201).json(product);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
