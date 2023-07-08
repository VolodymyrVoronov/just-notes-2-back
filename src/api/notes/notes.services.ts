import { z } from "zod";

import db from "../../utils/db";

const findAllNotes = (userId: string) => {
  const schema = z.object({
    userId: z.string(),
  });

  const parsed = schema.parse({
    userId,
  });

  return db.note.findMany({
    where: {
      userId: parsed.userId,
    },
  });
};

const createNote = (note: {
  note: string;
  color: string;
  favorite?: boolean;
  userId: string;
}) => {
  const schema = z.object({
    note: z.string(),
    color: z.string(),
    favorite: z.boolean().optional(),
    userId: z.string(),
  });

  const parsed = schema.parse(note);

  return db.note.create({
    data: parsed,
  });
};

const deleteNote = (id: string) => {
  const schema = z.object({
    id: z.string(),
  });

  const parsed = schema.parse({
    id,
  });

  return db.note.delete({
    where: {
      id: Number(parsed.id),
    },
  });
};

const addToFavorite = (id: string, favorite: boolean) => {
  const schema = z.object({
    id: z.string(),
    favorite: z.boolean(),
  });

  const parsed = schema.parse({
    id,
    favorite,
  });

  return db.note.update({
    where: {
      id: Number(parsed.id),
    },
    data: {
      favorite: parsed.favorite,
    },
  });
};

const updateNote = (id: string, note: string) => {
  const schema = z.object({
    id: z.string(),
    note: z.string(),
  });

  const parsed = schema.parse({
    id,
    note,
  });

  return db.note.update({
    where: {
      id: Number(parsed.id),
    },
    data: {
      note: parsed.note,
    },
  });
};

export { findAllNotes, createNote, deleteNote, addToFavorite, updateNote };
