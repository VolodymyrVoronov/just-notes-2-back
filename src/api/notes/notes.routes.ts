import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  console.log(req);

  try {
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/favorite",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

export default router;
