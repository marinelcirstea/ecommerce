import { Request, Response } from "express";
import productService from "@services/product-service";

async function createProduct(req: Request, res: Response) {
  const product = await productService.createProduct(req.body);

  return res.status(200).json({ success: true, message: "Product created successfully.", product });
}

async function getProduct(req: Request, res: Response) {
  const product = await productService.getProduct(
    { slug: req.params.slug },
    { exclude: ["__v", "createdAt", "updatedAt"] }
  );

  return res.status(200).json({ success: true, message: "Product fetched successfully.", product });
}

async function updateProduct(req: Request, res: Response) {
  await productService.updateProduct({ _id: req.params.productId }, req.body);

  return res.status(200).json({ success: true, message: "Product updated successfully." });
}

async function deleteProduct(req: Request, res: Response) {
  await productService.deleteProduct({ _id: req.params.productId });

  return res.status(200).json({ success: true, message: "Product deleted successfully." });
}

export default Object.freeze({
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
});
