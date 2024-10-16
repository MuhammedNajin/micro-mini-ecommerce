

import express, { Request, Response } from "express";
import { User } from "../model/user.model";


const router = express.Router();

router.get(
  "/api/v1/admin/user",
  
  async (req: Request, res: Response) => {
    try {

      const products = await User.find();
      res.status(200).json(products);

    } catch (error) {
      console.log(error)
      
    }
  }
);

export { router as getUserRouter };