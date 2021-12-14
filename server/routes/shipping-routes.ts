import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import shippingController from "@controllers/shipping-controller";
import { authMiddleware } from "@middlewares/auth-middleware";

export const shippingRoutes = Router();

/**
 * Get shipping options
 * @access  public
 */
shippingRoutes.get("/shipping", catchException(shippingController.getAllShippingOptions));

/**
 * Create a new shipping option
 * @access  private
 */
shippingRoutes.post(
  "/shipping",
  authMiddleware,
  catchException(shippingController.createShippingOption)
);

/**
 * Get one shipping option
 * @access  private
 */
shippingRoutes.get("/shipping/:id", catchException(shippingController.getShippingOption));

/**
 * Update shipping option
 * @access  private
 */
shippingRoutes.put(
  "/shipping/:id",
  authMiddleware,
  catchException(shippingController.updateShippingOption)
);

/**
 * Delete shipping option
 * @access  private
 */
shippingRoutes.delete(
  "/shipping/:id",
  authMiddleware,
  catchException(shippingController.deleteShippingOption)
);
