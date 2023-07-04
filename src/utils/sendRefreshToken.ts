import { Response } from "express";

const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    sameSite: true,
    path: "api/auth",
  });
};

export default sendRefreshToken;
