import bcrypt from "bcrypt";

import db from "../../utils/db";

const findUserByLogin = (login: string) => {
  return db.user.findUnique({
    where: {
      login,
    },
  });
};

const createUserByLoginAndPassword = (user: any) => {
  user.password = bcrypt.hashSync(user.password, 10);

  return db.user.create({
    data: user,
  });
};

const findUserById = (id: string) => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

export { findUserByLogin, createUserByLoginAndPassword, findUserById };
