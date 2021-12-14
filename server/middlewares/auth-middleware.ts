import { NextFunction, Request, Response } from "express";

import { Cookies } from "@interfaces";
import CustomError from "@libs/custom-error";

import { verifyAccessToken } from "@libs/jwt";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = verifyAccessToken(req.cookies[Cookies.AccessToken]);

    res.locals.token = token;

    return next();
  } catch (e: any) {
    throw new CustomError("Please log in and try again.", 401);
  }
}
