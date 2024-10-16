import express, { Request, Response } from "express";
import { User } from "../model/user.model";

const router = express.Router();

router.get(
  "/api/v1/cart/",
  async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
      const user = await User.findById(id)
        .select("-cart._id")
        .populate("cart.product");

      res.json(user?.cart);
    } catch (error) {}
  }
);

export { router as getCartRouter };