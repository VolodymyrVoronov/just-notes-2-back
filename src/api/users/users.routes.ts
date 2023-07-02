import express, { NextFunction, Request, Response } from "express";

import { isAuthenticated } from "../../middlewares";
import { findUserById } from "./users.services";

const router = express.Router();

router.get(
  "/profile",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload;
      const user = await findUserById(userId);

      if (user) {
        user.password = null;

        res.json(user);
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
