import { Request, Response } from "express";
import authService from "@services/auth-service";
import { Cookies } from "@interfaces/";

const login = async (req: Request, res: Response) => {
  await authService.loginWithEmailAndPassword(req.body, res);

  return res.end();
};

const refresh = async (req: Request, res: Response) => {
  await authService.refresh(req.cookies[Cookies.RefreshToken], res);

  return res.end();
};

const logout = async (_req: Request, res: Response) => {
  authService.logoutUser(res);

  return res.end();
};

export default {
  refresh,
  login,
  logout,
};
