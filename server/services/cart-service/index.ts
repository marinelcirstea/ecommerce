import { ICartModel, ICartItemModel } from "@interfaces/";
import CustomError from "@libs/custom-error";
import Cart from "@models/cart-model";
import { validateCart } from "./validation-helpers";

async function createOrUpdateCart({ cartId, items }: { cartId: string; items: ICartModel }) {
  const cartItems = validateCart(items);

  const cart = cartId ? await updateCart(cartId, cartItems) : await createCart(cartItems);
  return cart._id;
}

async function createCart(items: ICartItemModel[]) {
  const cart = new Cart({ items });
  await cart.save();
  return cart;
}

async function getCart(_id: string) {
  const cart = await Cart.findOne({ _id }).lean().populate("items.item", "title price");

  if (!cart) {
    throw new CustomError("Cart not found.", 404);
  }

  return cart;
}

async function updateCart(_id: string, items: ICartItemModel[]) {
  const cart = await Cart.findOneAndUpdate(
    { _id },
    { items },
    {
      upsert: true,
      new: true,
    }
  );

  return cart;
}

export default Object.freeze({
  createOrUpdateCart,
  getCart,
});
