import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import checkoutController from "@controllers/checkout-controller";
import { assignTokenToLocals } from "@middlewares/assign-token-to-locals";

export const checkoutRoutes = Router();

/**
 * Create a new Order
 * @access  public
 */
checkoutRoutes.post(
  "/checkouts/initiate",
  assignTokenToLocals,
  catchException(checkoutController.checkout)
);
