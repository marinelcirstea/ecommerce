import { Router } from "express";
import { authRoutes } from "./auth-routes";
import { cartRoutes } from "./cart-routes";
import { categoryRoutes } from "./category-routes";
import { productRoutes } from "./product-routes";
import { shippingRoutes } from "./shipping-routes";
import { userRoutes } from "./user-routes";

const globalRouter = Router();

globalRouter.use(authRoutes);
globalRouter.use(cartRoutes);
globalRouter.use(categoryRoutes);
globalRouter.use(productRoutes);
globalRouter.use(shippingRoutes);
globalRouter.use(userRoutes);

export default globalRouter;
