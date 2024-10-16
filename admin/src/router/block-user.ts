import express, { Request, Response } from "express";
import { User } from "../model/user.model";
import { kafkaWrapper } from "../kafka-wrapper";
import { UserBlockedPublisher } from "../events/publisher/user-blocked-publisher";

const router = express.Router();

router.patch(
  "/api/v1/admin/block/:id",

  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (user) {
        user.isBlocked = !user.isBlocked;
        await user.save();

        await new UserBlockedPublisher(kafkaWrapper.producer).publish({
          userId: user.id,
          isBlocked: user.isBlocked,
        });
      } else {
        throw new Error();
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(501).json(error);
    }
  }
);

export { router as BlockUserRouter };