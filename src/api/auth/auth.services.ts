import { z } from "zod";

import db from "../../utils/db";
import hashToken from "../../utils/hashToken";

const addRefreshTokenWhiteList = ({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) => {
  const schema = z.object({
    jti: z.string(),
    refreshToken: z.string(),
    userId: z.string(),
  });

  const parsed = schema.parse({
    jti,
    refreshToken,
    userId,
  });

  return db.refreshToken.create({
    data: {
      id: parsed.jti,
      hashedToken: hashToken(parsed.refreshToken),
      userId: parsed.userId,
    },
  });
};

const findRefreshTokenById = (id: string) => {
  const schema = z.object({
    id: z.string(),
  });

  const parsed = schema.parse({
    id,
  });

  return db.refreshToken.findUnique({
    where: {
      id: parsed.id,
    },
  });
};

const deleteRefreshToken = (id: string) => {
  const schema = z.object({
    id: z.string(),
  });

  const parsed = schema.parse({
    id,
  });

  return db.refreshToken.update({
    where: {
      id: parsed.id,
    },
    data: {
      revoked: true,
    },
  });
};

const revokeTokens = (userId: string) => {
  const schema = z.object({
    userId: z.string(),
  });

  const parsed = schema.parse({
    userId,
  });

  return db.refreshToken.updateMany({
    where: {
      userId: parsed.userId,
    },
    data: {
      revoked: true,
    },
  });
};

export {
  addRefreshTokenWhiteList,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
