import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import {
  addRefreshTokenWhiteList,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
} from "./auth.services";

import {
  findUserByLogin,
  createUserByLoginAndPassword,
  findUserById,
} from "../users/users.services";

import { generateTokens } from "../../utils/jwt";
import hashToken from "../../utils/hashToken";
import sendRefreshToken from "../../utils/sendRefreshToken";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        res.status(400);
        throw new Error("You must provide a login and a password.");
      }

      const existingUser = await findUserByLogin(login);

      if (existingUser) {
        res.status(400);
        throw new Error("User already exists.");
      }

      const user = await createUserByLoginAndPassword({
        login,
        password,
      });
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);

      await addRefreshTokenWhiteList({
        jti,
        refreshToken,
        userId: user.id,
      });

      sendRefreshToken(res, refreshToken);

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        res.status(400);
        throw new Error("You must provide a login and a password.");
      }

      const existingUser = await findUserByLogin(login);

      if (!existingUser) {
        res.status(400);
        throw new Error("Invalid login credentials.");
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password as string
      );

      if (!validPassword) {
        res.status(400);
        throw new Error("Invalid login credentials.");
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);

      await addRefreshTokenWhiteList({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      sendRefreshToken(res, refreshToken);

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.body.refresh_token;

      if (!refreshToken) {
        res.status(400);
        throw new Error("You must provide a refresh token.");
      }

      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as Secret
      ) as JwtPayload;

      const savedRefreshToken = await findRefreshTokenById(
        payload.jti as string
      );

      if (!savedRefreshToken || savedRefreshToken.revoked === true) {
        res.status(401);
        throw new Error("Unauthorized.");
      }

      const hashedToken = hashToken(refreshToken);

      if (hashedToken !== savedRefreshToken.hashedToken) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      const user = await findUserById(payload.userId);

      if (!user) {
        res.status(401);
        throw new Error("Unauthorized.");
      }

      await deleteRefreshToken(savedRefreshToken.id);
      const jti = uuidv4();
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        user,
        jti
      );

      await addRefreshTokenWhiteList({
        jti,
        refreshToken: newRefreshToken,
        userId: user.id,
      });

      sendRefreshToken(res, newRefreshToken);

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/revoke",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      await revokeTokens(userId);

      res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
