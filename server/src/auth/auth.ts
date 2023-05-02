import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "";

// @ts-ignore
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) return res.sendStatus(401);
  try {
    const decode = jwt.verify(accessToken, secretKey);
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
