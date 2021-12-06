import { Router } from "express";
import catchException from "@middlewares/catch-exception";
import categoryController from "@controllers/category-controller";
import { authMiddleware } from "@middlewares/auth-middleware";

export const categoryRoutes = Router();

/**
 * Create a new category
 * @access  public (only for testing)
 * TODO     make private
 */
categoryRoutes.post("/categories", catchException(categoryController.createCategory));

/**
 * Get category
 * @access  public
 */
categoryRoutes.get("/categories/:slug", catchException(categoryController.getCategory));

/**
 * Update category
 * @access  private
 */
categoryRoutes.put(
  "/categories/:categoryId",
  authMiddleware,
  catchException(categoryController.updateCategory)
);

/**
 * Delete category
 * @access  private
 */
categoryRoutes.delete(
  "/categories/:categoryId",
  authMiddleware,
  catchException(categoryController.deleteCategory)
);
