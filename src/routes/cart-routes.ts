import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import cartController from "@controllers/cart-controller";

export const cartRoutes = Router();

/**
 * Create a new Cart
 * @access  public
 */
cartRoutes.post("/carts", catchException(cartController.createOrUpdateCart));

/**
 * Get Cart
 * @access  public
 */
cartRoutes.get("/carts/:id", catchException(cartController.getCart));
