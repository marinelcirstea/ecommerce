import { Request, Response } from "express";
import orderService from "@services/order-service";

async function createOrder(req: Request, res: Response) {
  const order = await orderService.createOrder(req.body);

  return res.status(200).json(order);
}

async function getOrder(req: Request, res: Response) {
  const order = await orderService.getOrder(req.params.orderId);

  return res.status(200).json(order);
}

async function updateOrder(req: Request, res: Response) {
  await orderService.updateOrder(req.params.orderId, req.body);

  return res.end();
}

export default Object.freeze({
  createOrder,
  getOrder,
  updateOrder,
});
