import express, { Request, Response } from "express";
import { Product } from "../model/product.model";
import { User } from "../model/user.model";


const router = express.Router();

router.delete(
  "/api/v1/cart/:id",

  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) throw new Error();

      const user = await User.findById(id);

      if (!user) throw new Error()

      const arr = user.cart.filter((el: any) => {
        return el.product + 1 !== id + 1;
      });

      user.cart = arr;
      await user?.save();

      const userCart = await User.findById(id)
        .select("-cart._id")
        .populate("cart.product");

      if (userCart) {
        res.json(userCart.cart);
      }
    } catch (error) {}
  }
);

export { router as deleteFromCartRouter };