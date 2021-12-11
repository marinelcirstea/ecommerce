import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import cartController from "@controllers/cart-controller";
import { authMiddleware } from "@middlewares/auth-middleware";
import { assignTokenToLocals } from "@middlewares/assign-token-to-locals";

export const cartRoutes = Router();

/**
 * Create a new Cart
 * @access  public (only for testing)
 * TODO     make private
 */
cartRoutes.post("/carts", assignTokenToLocals, catchException(cartController.createCart));

/**
 * Get Cart
 * @access  private
 */
cartRoutes.get("/carts/:id", authMiddleware, catchException(cartController.getCart));

/**
 * Update Cart
 * @access  private
 */
cartRoutes.put("/carts/:id", authMiddleware, catchException(cartController.updateCart));
