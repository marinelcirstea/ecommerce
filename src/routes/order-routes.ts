import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import orderController from "@controllers/order-controller";
import { authMiddleware } from "@middlewares/auth-middleware";

export const orderRoutes = Router();

/**
 * Create a new Order
 * @access  private
 */
orderRoutes.post("/orders", authMiddleware, catchException(orderController.createOrder));

/**
 * Get Order
 * @access  private
 */
orderRoutes.get("/orders/:orderId", authMiddleware, catchException(orderController.getOrder));

/**
 * Update Order
 * @access  private
 */
orderRoutes.put("/orders/:orderId", authMiddleware, catchException(orderController.updateOrder));
