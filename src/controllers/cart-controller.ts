import { Request, Response } from "express";
import cartService from "@services/cart-service";

async function createCart(req: Request, res: Response) {
  const session = res.locals.token;
  const cart = await cartService.createCart(req.body, session?.userId || "");

  return res.status(200).json({ success: true, message: "Cart created successfully.", cart });
}

async function getCart(req: Request, res: Response) {
  const cart = await cartService.getCart(req.params.id);

  return res.status(200).json({ success: true, message: "Cart fetched successfully.", cart });
}

async function updateCart(req: Request, res: Response) {
  await cartService.updateCart(req.params.id, req.body);

  return res.status(200).json({ success: true, message: "Cart updated successfully." });
}

export default Object.freeze({
  createCart,
  getCart,
  updateCart,
});
