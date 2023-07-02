import db from "../../utils/db";
import hashToken from "../../utils/hashToken";

const addRefreshTokenWhiteList = ({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: any;
}) => {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

const findRefreshTokenById = (id: string) => {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

const deleteRefreshToken = (id: string) => {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

const revokeTokens = (userIdL: string) => {
  return db.refreshToken.updateMany({
    where: {
      userId: userIdL,
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
