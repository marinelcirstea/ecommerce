import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import productController from "@controllers/product-controller";

export const productRoutes = Router();

/**
 * Create a new account
 * @access  public (only for testing)
 */
productRoutes.post("/products", catchException(productController.createProduct));
