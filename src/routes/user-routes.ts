import { Router } from "express";
import { authMiddleware } from "@middlewares/auth-middleware";
import catchException from "@middlewares/catch-exception";
import userController from "@controllers/user-controller";

export const userRoutes = Router();

/**
 * Create a new account
 * @access  public
 */
userRoutes.post("/users", catchException(userController.createUser));

/**
 * Get the current user
 * @access  private
 */
userRoutes.get("/users/me", authMiddleware, catchException(userController.getCurrentUser));

/**
 * Update the current user
 * @access  private
 */
userRoutes.put("/users/me", authMiddleware, catchException(userController.updateCurrentUser));

/**
 * Delete the current user
 * @access  private
 */
userRoutes.delete("/users/me", authMiddleware, catchException(userController.deleteCurrentUser));
