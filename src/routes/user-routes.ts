import { Router, Response } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import catchException from "../middlewares/catch-exception";
import { userController } from "../controllers";

const userRoutes = Router();

userRoutes.get("/users/health", (_req, res: Response) => res.status(200).end());

// userRoutes.get("/users", authMiddleware, catchException(userController.getUsers));
/**
 * Create a new account
 * @access  public
 */
userRoutes.post("/users", catchException(userController.createUser));
/**
 * Login
 * @access  public
 */
userRoutes.post("/users/login", catchException(userController.loginUser));
/**
 * Logout
 * @access  private
 */
userRoutes.post("/users/logout", authMiddleware, catchException(userController.logoutUser));
/**
 * Get the current user
 * @access  private
 */
userRoutes.get("/users/me", authMiddleware, catchException(userController.getCurrentUser));
/**
 * Update the current user
 * @access  private
 */
// userRoutes.put('/users/me',authMiddleware, catchException(userController.updateCurrentUser))
/**
 * Delete the current user
 * @access  private
 */
// userRoutes.delete('/users/me',authMiddleware, catchException(userController.deleteCurrentUser))

export { userRoutes };
