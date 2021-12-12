import CustomError from "@libs/custom-error";
import stripe from "./stripe-api";
import GC from "@configs";

async function createPaymentIntent(body: { [key: string]: any }) {
  try {
    // const { currency } = body;
    console.log(body);
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: 120,
      currency: "usd",
      metadata: {
        orderId: "myorderid",
      },
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
