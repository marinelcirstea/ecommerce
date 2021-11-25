import { Router } from "express";
import { userRoutes } from "./user-routes";

const router = Router();

router.use(userRoutes);
// router.use(productRoutes)

export default router;
