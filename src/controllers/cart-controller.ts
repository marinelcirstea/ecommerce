import { Request, Response } from "express";
import cartService from "@services/cart-service";

async function createOrUpdateCart(req: Request, res: Response) {
  const cart = await cartService.createOrUpdateCart(req.body);

  return res.status(200).json({ success: true, message: "Cart updated", cart });
}

async function getCart(req: Request, res: Response) {
  const cart = await cartService.getCart(req.params.id);

  return res.status(200).json(cart);
}

export default Object.freeze({
  createOrUpdateCart,
  getCart,
});
