import { Request, Response } from "express";
import categoryService from "@services/category-service";

async function createCategory(req: Request, res: Response) {
  const category = await categoryService.createCategory(req.body);

  return res
    .status(200)
    .json({ success: true, message: "Category created successfully.", category });
}

async function getCategory(req: Request, res: Response) {
  const category = await categoryService.getCategory(
    { slug: req.params.slug },
    { exclude: ["__v", "createdAt", "updatedAt"] }
  );

  return res
    .status(200)
    .json({ success: true, message: "Category fetched successfully.", category });
}

async function updateCategory(req: Request, res: Response) {
  await categoryService.updateCategory({ _id: req.params.categoryId }, req.body);

  return res.status(200).json({ success: true, message: "Category updated successfully." });
}

async function deleteCategory(req: Request, res: Response) {
  await categoryService.deleteCategory({ _id: req.params.categoryId });

  return res.status(200).json({ success: true, message: "Category deleted successfully." });
}

export default Object.freeze({
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
});
