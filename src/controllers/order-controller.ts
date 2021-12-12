import { Request, Response } from "express";
import orderService from "@services/order-service";

async function createOrder(req: Request, res: Response) {
  const order = await orderService.createOrder(req.body);

  return res
    .status(200)
    .json({ success: true, message: "Order created successfully.", data: order });
}

async function getOrder(req: Request, res: Response) {
  const order = await orderService.getOrder(req.params.orderId);

  return res
    .status(200)
    .json({ success: true, message: "Order fetched successfully.", data: order });
}

async function updateOrder(req: Request, res: Response) {
  await orderService.updateOrder(req.params.orderId, req.body);

  return res.status(200).json({ success: true, message: "Order updated successfully." });
}

export default Object.freeze({
  createOrder,
  getOrder,
  updateOrder,
});
