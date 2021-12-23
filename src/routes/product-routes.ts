import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import productController from "@controllers/product-controller";
import { authMiddleware } from "@middlewares/auth-middleware";

export const productRoutes = Router();

/**
 * Create a new product
 * @access  public (only for testing)
 * TODO     make private
 */
productRoutes.post("/products", catchException(productController.createProduct));

/**
 * Get product
 * @access  public
 */
productRoutes.get("/products", catchException(productController.getAllProducts));

/**
 * Get product
 * @access  public
 */
productRoutes.get("/products/:slug", catchException(productController.getProduct));

/**
 * Update product
 * @access  private
 */
productRoutes.put(
  "/products/:productId",
  authMiddleware,
  catchException(productController.updateProduct)
);

/**
 * Delete product
 * @access  private
 */
productRoutes.delete(
  "/products/:productId",
  authMiddleware,
  catchException(productController.deleteProduct)
);
