import { Router, Request, Response } from "express";
import catchException from "@middlewares/catch-exception";
import { assignTokenToLocals } from "@middlewares/assign-token-to-locals";

export const checkoutRoutes = Router();

/**
 * Create a new Order
 * @access  public
 */
checkoutRoutes.post(
  "/webhooks",
  assignTokenToLocals,
  catchException(async (req: Request, res: Response) => {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!", paymentIntent);
        break;
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!", paymentIntent);
        break;
      }
      case "payment_method.attached": {
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!", paymentMethod);
        break;
      }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  })
);
