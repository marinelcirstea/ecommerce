import Stripe from "stripe";
import GC from "@configs";

const { STRIPE_PRIVATE_KEY } = GC;
const stripe = new Stripe(STRIPE_PRIVATE_KEY, {
  apiVersion: "2020-08-27",
});

export default stripe;
