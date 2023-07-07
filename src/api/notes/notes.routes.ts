import express, { NextFunction, Request, Response } from "express";

import { findAllNotes, createNote } from "./notes.services";

const router = express.Router();

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.payload.userId;

    const notes = await findAllNotes(userId);

    if (notes) {
      res.json(notes);
    } else {
      res.json({
        message: "No notes found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.payload.userId;
      const { note, color, favorite } = req.body;

      const newNote = await createNote({
        note,
        color,
        favorite,
        userId,
      });

      res.json(newNote);
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
