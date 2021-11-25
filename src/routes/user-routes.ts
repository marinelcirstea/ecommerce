import { Router, Response } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import catchException from "../middlewares/catch-exception";
import userService from "../services/user-service";

const userRoutes = Router();

userRoutes.get("/users/health", (_req, res: Response) => res.status(200).end());

// userRoutes.get("/users", authMiddleware, catchException(userService.getUsers));
userRoutes.post("/users", catchException(userService.createUser));
userRoutes.post("/users/login", catchException(userService.loginUser));
userRoutes.post("/users/logout", authMiddleware, catchException(userService.logoutUser));
userRoutes.get("/users/me", authMiddleware, catchException(userService.getCurrentUser));
// userRoutes.get("/users/:userId", authMiddleware, catchException(userService.getUserById));
// userRoutes.put("/users/:userId", authMiddleware, catchException(userService.updateUserById));
// userRoutes.delete("/users/:userId", authMiddleware, catchException(userService.deleteUserById));

export { userRoutes };
