import GC from "@configs";
import { CookieOptions, Response } from "express";
import jwt from "./jwt";

import {
  AccessToken,
  AccessTokenPayload,
  Cookies,
  RefreshToken,
  RefreshTokenPayload,
  IUserDocument,
} from "../../interfaces";

enum TokenExpiration {
  Access = 10 * 60, // 10 min
  Refresh = 14 * 24 * 60 * 60, // 14 days
  RefreshIfLessThan = 7 * 24 * 60 * 60, // 7 days
}

function signAccessToken(payload: AccessTokenPayload) {
  return jwt.encode(
    {
      ...payload,
      iat: Date.now(),
      exp: TokenExpiration.Access,
    },
    `${GC.ACCESS_TOKEN_SECRET}`
  );
}

function signRefreshToken(payload: RefreshTokenPayload) {
  return jwt.encode(
    {
      ...payload,
      iat: Date.now(),
      exp: TokenExpiration.Refresh,
    },
    GC.REFRESH_TOKEN_SECRET
  );
}

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: GC.IS_PRODUCTION,
  sameSite: GC.IS_PRODUCTION ? "strict" : "lax",
  // domain: config.baseDomain,
  path: "/",
};

const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Refresh * 1000 /*s->ms*/,
};

const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Access * 1000 /*s->ms*/,
};

export function verifyRefreshToken(token: string) {
  return jwt.decode(token, GC.REFRESH_TOKEN_SECRET) as RefreshToken;
}

export function verifyAccessToken(token: string) {
  return jwt.decode(token, GC.ACCESS_TOKEN_SECRET) as AccessToken;
}

export function buildTokens(user: IUserDocument) {
  const accessPayload: AccessTokenPayload = { userId: user._id };
  const refreshPayload: RefreshTokenPayload = { userId: user._id, version: user.tokenVersion };

  const accessToken = signAccessToken(accessPayload);
  const refreshToken = refreshPayload && signRefreshToken(refreshPayload);

  return { accessToken, refreshToken };
}

export function setTokens(res: Response, access: string, refresh?: string) {
  res.cookie(Cookies.AccessToken, access, accessTokenCookieOptions);
  if (refresh) res.cookie(Cookies.RefreshToken, refresh, refreshTokenCookieOptions);
}

export function refreshTokens(current: RefreshToken, tokenVersion: number) {
  if (tokenVersion !== current.version) throw "Token revoked";

  const accessPayload: AccessTokenPayload = { userId: current.userId };
  let refreshPayload: RefreshTokenPayload | undefined;

  const expiration = new Date(current.exp * 1000);
  const now = new Date();
  const secondsUntilExpiration = (expiration.getTime() - now.getTime()) / 1000;

  if (secondsUntilExpiration < TokenExpiration.RefreshIfLessThan) {
    refreshPayload = { userId: current.userId, version: tokenVersion };
  }

  const accessToken = signAccessToken(accessPayload);
  const refreshToken = refreshPayload && signRefreshToken(refreshPayload);

  return { accessToken, refreshToken };
}

export function clearTokens(res: Response) {
  res.cookie(Cookies.AccessToken, "", { ...defaultCookieOptions, maxAge: 0 });
  res.cookie(Cookies.RefreshToken, "", { ...defaultCookieOptions, maxAge: 0 });
}
