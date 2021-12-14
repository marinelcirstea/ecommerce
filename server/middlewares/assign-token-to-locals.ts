import { NextFunction, Request, Response } from "express";
import { Cookies } from "@interfaces";
import { verifyAccessToken } from "@libs/jwt";

// Used for carts controller

// if the token exists, the user is signed in, so we'll
// assign the userId to a cart

// if not, checkout as guest
export function assignTokenToLocals(req: Request, res: Response, next: NextFunction) {
  try {
    const token = verifyAccessToken(req.cookies[Cookies.AccessToken]);

    res.locals.token = token;
  } finally {
    return next();
  }
}
