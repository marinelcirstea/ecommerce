import { Router } from "express";
import { authRoutes } from "./auth-routes";
import { userRoutes } from "./user-routes";

const globalRouter = Router();

globalRouter.use(authRoutes);
globalRouter.use(userRoutes);

export default globalRouter;
