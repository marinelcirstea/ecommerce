import { Request, Response } from "express";
import authService from "@services/auth-service";

const login = async (req: Request, res: Response) => {
  await authService.loginWithEmailAndPassword(req.body, res);

  return res.status(200).json({ success: true, message: "Login successful." });
};

const logout = async (_req: Request, res: Response) => {
  authService.logoutUser(res);

  return res.status(200).json({ success: true, message: "Logout successful." });
};

export default {
  login,
  logout,
};
