import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);

  const error = new Error("Not Found");

  next(error);
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);

    throw new Error("🚫 Unauthorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret);

    req.user = payload;
  } catch (error) {
    res.status(401);

    if (
      error instanceof jwt.TokenExpiredError &&
      error.name === "TokenExpiredError"
    ) {
      throw new Error(error.name);
    }

    throw new Error("🚫 Unauthorized 🚫");
  }

  return next();
};

export { notFound, errorHandler, isAuthenticated };
