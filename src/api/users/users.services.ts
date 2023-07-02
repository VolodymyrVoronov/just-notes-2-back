import bcrypt from "bcrypt";
import { z } from "zod";

import db from "../../utils/db";

const findUserByLogin = (login: string) => {
  const schema = z.object({
    login: z.string(),
  });

  const parsed = schema.parse({
    login,
  });

  return db.user.findUnique({
    where: {
      login: parsed.login,
    },
  });
};

const createUserByLoginAndPassword = (user: {
  login: string;
  password: string;
}) => {
  const schema = z.object({
    login: z.string(),
    password: z.string(),
  });

  const parsed = schema.parse(user);

  parsed.password = bcrypt.hashSync(parsed.password, 10);

  return db.user.create({
    data: parsed,
  });
};

const findUserById = (id: string) => {
  const schema = z.object({
    id: z.string(),
  });

  const parsed = schema.parse({
    id,
  });

  return db.user.findUnique({
    where: {
      id: parsed.id,
    },
  });
};

export { findUserByLogin, createUserByLoginAndPassword, findUserById };
