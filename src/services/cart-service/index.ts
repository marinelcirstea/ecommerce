import { ICartModel, KeysOfModel } from "@interfaces/";
import CustomError from "@libs/custom-error";
import Cart from "@models/cart-model";

async function createCart(data: ICartModel, userId: string = "") {
  const cart = new Cart({
    ...data,
    userId,
  });

  await cart.save();

  return cart;
}

async function getCart(cartId: string) {
  const cart = await Cart.findOne({ _id: cartId }).lean().populate("items.item", "title price");

  if (!cart) {
    throw new CustomError("Cart not found.", 404);
  }

  return cart;
}

async function updateCart(cartId: string, data: KeysOfModel<ICartModel>) {
  const upd = await Cart.updateOne({ _id: cartId }, data);

  if (!upd.acknowledged) {
    throw new CustomError("Failed to update cart.", 400);
  }
}

export default Object.freeze({
  createCart,
  getCart,
  updateCart,
});
