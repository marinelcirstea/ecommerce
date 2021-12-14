import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import stripeController from "@controllers/stripe-controller";

export const stripeRoutes = Router();

stripeRoutes.post(
  "/stripe/create-payment-intent",
  catchException(stripeController.createPaymentIntent)
);

stripeRoutes.get("/stripe/config", stripeController.getPublishableKey);
