import { Request, Response } from "express";
import productService from "@services/product-service";

async function createProduct(req: Request, res: Response) {
  const product = await productService.createProduct(req.body);

  return res.status(200).json(product);
}

async function getProduct(req: Request, res: Response) {
  const product = await productService.getProduct(
    { slug: req.params.slug },
    { exclude: ["__v", "createdAt", "updatedAt"] }
  );

  return res.status(200).json(product);
}

async function getAllProducts(_req: Request, res: Response) {
  const products = await productService.getAllProducts();

  return res.status(200).json(products);
}

async function updateProduct(req: Request, res: Response) {
  await productService.updateProduct({ _id: req.params.productId }, req.body);

  return res.end();
}

async function deleteProduct(req: Request, res: Response) {
  await productService.deleteProduct({ _id: req.params.productId });

  return res.end();
}

export default Object.freeze({
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
});
