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

export { findAllNotes, createNote };
