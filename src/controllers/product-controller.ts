import { Request, Response } from "express";
import productService from "@services/product-service";

async function createProduct(req: Request, res: Response) {
  const product = await productService.createProduct(req.body);

  return res.status(200).json({ success: true, message: "Product created successfully.", product });
}

async function getProduct(req: Request, res: Response) {
  return res.status(200).json({ success: false, message: "Not set up yet." });
}
async function updateProduct(req: Request, res: Response) {
  return res.status(200).json({ success: false, message: "Not set up yet." });
}
async function deleteProduct(req: Request, res: Response) {
  return res.status(200).json({ success: false, message: "Not set up yet." });
}

export default Object.freeze({
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
});
