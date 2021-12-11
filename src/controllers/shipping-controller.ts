import { Request, Response } from "express";
import shippingService from "../services/shipping-service";

async function createShippingOption(req: Request, res: Response) {
  await shippingService.createShippingOption(req.body);

  return res.status(200).json({ success: true, message: "Shipping option created successfully." });
}

async function getShippingOption(req: Request, res: Response) {
  const shipping = await shippingService.getShippingOption(req.params.id);

  return res
    .status(200)
    .json({ success: true, message: "Shipping option fetched successfully.", shipping });
}

async function getAllShippingOptions(_req: Request, res: Response) {
  const shipping = await shippingService.getAllShippingOptions();

  return res
    .status(200)
    .json({ success: true, message: "Shipping options fetched successfully.", shipping });
}

async function updateShippingOption(req: Request, res: Response) {
  await shippingService.updateShippingOption(req.params.id, req.body);

  return res.status(200).json({ success: true, message: "Shipping option updated successfully." });
}

async function deleteShippingOption(req: Request, res: Response) {
  await shippingService.deleteShippingOption(req.params.id);

  return res.status(200).json({ success: true, message: "Shipping option deleted successfully." });
}

export default {
  createShippingOption,
  getShippingOption,
  getAllShippingOptions,
  updateShippingOption,
  deleteShippingOption,
};
