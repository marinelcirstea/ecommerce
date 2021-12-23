import { Request, Response } from "express";
import checkoutService from "@services/checkout-service";

// Checkout flow ?
// client-> post request to create an order
// create order and set the payment status to "awaiting_payment"
// send back the clientSecret from stripe API and initiate checkout
// create webhooks and liten to changes in the payment process
// when stripe accepts the payment, activate the order and send email
async function checkout(req: Request, res: Response) {
  console.log("req.body:", req.body);
  const session = res.locals.token;

  const order = await checkoutService.checkout(req.body, session?.userId);

  return res.status(200).json(order);
}

export default Object.freeze({
  checkout,
});
