import stripeService from "@services/stripe-service";
import { Request, Response } from "express";

async function createPaymentIntent(req: Request, res: Response) {
  const clientSecret = await stripeService.createPaymentIntent(req.body);

  return res.status(200).json(clientSecret);
}

async function getPublishableKey(_req: Request, res: Response) {
  const publishableKey = stripeService.getPublishableKey();

  return res.status(200).json(publishableKey);
}

export default Object.freeze({
  createPaymentIntent,
  getPublishableKey,
});
