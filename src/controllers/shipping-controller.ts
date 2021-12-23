import { Request, Response } from "express";
import shippingService from "../services/shipping-service";

async function createShippingOption(req: Request, res: Response) {
  await shippingService.createShippingOption(req.body);

  return res.end();
}

async function getShippingOption(req: Request, res: Response) {
  const shipping = await shippingService.getShippingOption(req.params.id);

  return res.status(200).json(shipping);
}

async function getAllShippingOptions(_req: Request, res: Response) {
  const shipping = await shippingService.getAllShippingOptions();

  return res.status(200).json(shipping);
}

async function updateShippingOption(req: Request, res: Response) {
  await shippingService.updateShippingOption(req.params.id, req.body);

  return res.end();
}

async function deleteShippingOption(req: Request, res: Response) {
  await shippingService.deleteShippingOption(req.params.id);

  return res.end();
}

export default {
  createShippingOption,
  getShippingOption,
  getAllShippingOptions,
  updateShippingOption,
  deleteShippingOption,
};
