import CustomError from "@libs/custom-error";
import stripe from "./stripe-api";
import GC from "@configs";

async function createPaymentIntent(amount: number, metadata: { [key: string]: any } = {}) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: amount * 100,
      currency: "usd",
      metadata,
    });
    console.log(paymentIntent);
    return paymentIntent.client_secret;
  } catch (_e: any) {
    const e: Error = _e;
    throw new CustomError(`Failed to create payment intent. Error:${e.message}`, 500);
  }
}

function getPublishableKey() {
  const { STRIPE_PUBLISHABLE_KEY } = GC;
  return STRIPE_PUBLISHABLE_KEY;
}
export default Object.freeze({
  createPaymentIntent,
  getPublishableKey,
});
