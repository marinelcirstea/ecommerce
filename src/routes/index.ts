import { Router } from "express";
import { authRoutes } from "./auth-routes";
import { userRoutes } from "./user-routes";
import { productRoutes } from "./product-routes";
import { categoryRoutes } from "./category-routes";

const globalRouter = Router();

globalRouter.use(authRoutes);
globalRouter.use(userRoutes);
globalRouter.use(productRoutes);
globalRouter.use(categoryRoutes);

export default globalRouter;
