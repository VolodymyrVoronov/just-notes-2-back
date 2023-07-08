import express, { NextFunction, Request, Response } from "express";

import {
  findAllNotes,
  createNote,
  deleteNote,
  addToFavorite,
  updateNote,
} from "./notes.services";

const router = express.Router();

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.payload.userId;

    const notes = await findAllNotes(userId);

    if (notes) {
      res.json(notes.reverse());
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
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { note } = req.body;

      await updateNote(id, note);

      res.json({
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/favorite/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { favorite } = req.body;
      const noteId = req.params.id;

      await addToFavorite(noteId, favorite);

      res.json({
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = req.params.id;

      await deleteNote(noteId);

      res.json({
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
