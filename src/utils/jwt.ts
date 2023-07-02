import jwt, { Secret } from "jsonwebtoken";

const generateAccessToken = (user: any) => {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET as Secret,
    {
      expiresIn: "8h",
    }
  );
};

const generateRefreshToken = (user: any, jti: any) => {
  return jwt.sign(
    { userId: user.id, jti },
    process.env.JWT_REFRESH_SECRET as Secret,
    {
      expiresIn: "7d",
    }
  );
};

const generateTokens = (user: any, jti: any) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};

export { generateAccessToken, generateRefreshToken, generateTokens };
