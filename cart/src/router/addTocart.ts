import express, { Request, Response } from "express";

import { Product } from "../model/product.model";
import { User } from "../model/user.model";

const router = express.Router();

router.get(
  "/api/v1/cart/:id",

  async (req: Request, res: Response) => {
    try {
      const { productId, userId } = req.params;
      const product = await Product.findById(productId);
      if (!product) throw new Error()

      const user = await User.findById(userId);

      if (!user) throw new Error()

      let flag = 0;
      user.cart.forEach((el: any) => {
        if (el.product  === productId) {
          el.count++;
          flag = 1;
        }
      });

      if (flag === 0) {
        user.cart.push({ count: 1, product: productId });
      }

      await user?.save();

      const userCart = await User.findById(userId)
        .select("-cart._id")
        .populate("cart.product");

      res.json(userCart?.cart);
    } catch (error) {}
  }
);

export { router as addToCartRouter };