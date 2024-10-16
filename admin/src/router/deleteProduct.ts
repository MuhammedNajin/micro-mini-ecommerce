import express, { Request, Response } from "express";
import { Product } from "../model/produt.model";
import { kafkaWrapper } from "../kafka-wrapper";
import { ProductDeletedPublisher } from "../events/publisher/product-deleted-publisher";
const router = express.Router();

router.delete(
  "/api/v1/admin/product/:productId",
  async (req: Request, res: Response) => {
    try {
      console.log('deletete')
      const { productId } = req.params;

      const product = await Product.findByIdAndDelete(productId);
      
      if(!product) {
        throw new Error('product not found');
      }
     
      await new ProductDeletedPublisher(kafkaWrapper.producer).publish({
        id: product.id,
      });

      res.status(200).json({ message: "PRODUCT DELETED" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export { router as deleteProductRouter };