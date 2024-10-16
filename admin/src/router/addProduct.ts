import express, { Request, Response } from "express";
import { Product } from "../model/produt.model";
import { kafkaWrapper } from "../kafka-wrapper";
import { ProductCreatedPublisher } from "../events/publisher/product-created-publisher";

const router = express.Router();

router.post(
  "/api/v1/admin/product",
  
  async (req: Request, res: Response) => {
    try {
        console.log('addproduct', req.body)
      const { title, description, stock, price, image } = req.body;

      const product = Product.build({
        title,
        description,
        stock,
        price,
        image,
      });

      await product.save();

      await new ProductCreatedPublisher(kafkaWrapper.producer).publish({
        description: product.description,
        title: product.title,
        stock: Number(product.stock),
        price: Number(product.price),
        image: product.image,
        id: product.id,
      });

      res.status(201).json(product);
    } catch (error) {
      console.log(error)
      
    }
  }
);

export { router as addProductRouter };