import { ICategoryModel } from "@interfaces";
import {
  validateCategoryDescription,
  validateCategoryMetaDescription,
  validateCategoryMetaTitle,
  validateCategorySlug,
  validateCategoryTitle,
} from "./validation-helpers";

export function makeCategory({
  title,
  metaTitle,
  description,
  metaDescription,
  slug,
}: ICategoryModel): Readonly<ICategoryModel> {
  validateCategoryTitle(title);

  metaTitle && validateCategoryMetaTitle(title);

  validateCategoryDescription(description);

  metaDescription && validateCategoryMetaDescription(metaDescription);

  validateCategorySlug(slug);

  return Object.freeze({
    title,
    metaTitle: metaTitle ?? title,
    description,
    metaDescription: metaDescription ?? description,
    slug,
  });
}
