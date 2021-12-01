import { Router } from "express";
import { authRoutes } from "./auth-routes";
import { productRoutes } from "./product-routes";
import { userRoutes } from "./user-routes";

const globalRouter = Router();

globalRouter.use(authRoutes);
globalRouter.use(userRoutes);
globalRouter.use(productRoutes);

export default globalRouter;
