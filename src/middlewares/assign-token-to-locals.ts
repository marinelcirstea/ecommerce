import { NextFunction, Request, Response } from "express";
import { Cookies } from "@interfaces";
import { verifyAccessToken } from "@libs/jwt";

export function assignTokenToLocals(req: Request, res: Response, next: NextFunction) {
  try {
    const token = verifyAccessToken(req.cookies[Cookies.AccessToken]);

    res.locals.token = token;
  } finally {
    return next();
  }
}
