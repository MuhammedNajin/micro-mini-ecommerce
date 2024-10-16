

import express, { Request, Response } from "express";
import { Product } from "../model/produt.model";


const router = express.Router();

router.get(
  "/api/v1/admin/product",
  
  async (req: Request, res: Response) => {
    try {

      const products = await Product.find();
      res.status(200).json(products);

    } catch (error) {
      console.log(error)
      
    }
  }
);

export { router as getProductRouter };