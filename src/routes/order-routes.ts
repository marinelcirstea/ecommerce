import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import orderController from "@controllers/order-controller";
import { authMiddleware } from "@middlewares/auth-middleware";

export const orderRoutes = Router();

/**
 * Create a new Order
 * @access  public (only for testing)
 * TODO     make private
 */
orderRoutes.post("/orders", catchException(orderController.createOrder));

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
