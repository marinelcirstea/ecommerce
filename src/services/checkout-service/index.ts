import cartService from "@services/cart-service";
import orderService from "@services/order-service";
import stripeService from "@services/stripe-service";
import CustomError from "@libs/custom-error";

async function checkout(reqBody: any, userId: string = "") {
  console.log("reqbody: ", reqBody);
  const { cartId, address, shipping } = reqBody;

  // todo: create validation for address and shipping

  if (!cartId || typeof cartId !== "string") {
    throw new CustomError(`cartId is invalid. Expected string, but received ${typeof cartId}`, 400);
  }

  const cart = await cartService.getCart(cartId);

  if (cart.items.length < 1) {
    throw new CustomError("You need a minimum of 1 products to place an order.", 400);
  }

  const itemsTotal = getTotal(cart.items);

  const order = await orderService.createOrder({
    user: userId || "",
    cart: cartId,
    address,
    shipping,
    itemsTotal,
    status: "pending",
    total: itemsTotal,
  });

  const clientSecret = await stripeService.createPaymentIntent(itemsTotal, { orderId: order._id });

  console.log("order: ", order);

  return clientSecret;
}

function getTotal(items: any) {
  return items.reduce((sum: number, { item, quantity }: { item: any; quantity: number }) => {
    return (sum += item.price * quantity);
  }, 0);
}

export default Object.freeze({
  checkout,
});
