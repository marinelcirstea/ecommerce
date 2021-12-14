import { Router } from "express";
import { authMiddleware } from "@middlewares/auth-middleware";
import catchException from "@middlewares/catch-exception";
import authController from "@controllers/auth-controller";

export const authRoutes = Router();

/**
 * Login
 * @access  public
 */
authRoutes.post("/auth/login", catchException(authController.login));

/**
 * Logout
 * @access  private
 */
authRoutes.post("/auth/logout", authMiddleware, catchException(authController.logout));
