import express, { Request, Response } from "express";
import { Product } from "../model/produt.model";
import { kafkaWrapper } from "../kafka-wrapper";
import { ProductUpdatedPublisher } from "../events/publisher/product-updated-publisher";
const router = express.Router();

router.put(
  "/api/v1/admin/product/",
  async (req: Request, res: Response) => {
    try {
      console.log(req.url, req.body);
      
      const { title, description, price, stock, image, id } = req.body;

      const product = await Product.findById(id);
   
      if (!product) {
        throw new Error()
      }

      if (title) product.title = title;
      if (description) product.description = description;
      if (price && !isNaN(price)) product.price = price;
      if (stock) product.stock = stock;
      if (image) product.image = image;

      await product.save();

      await new ProductUpdatedPublisher(kafkaWrapper.producer).publish({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        id: product.id,
      });

      res.json(product);
    } catch (error) {
      throw new Error()
    }
  }
);

export { router as updateProductRouter };