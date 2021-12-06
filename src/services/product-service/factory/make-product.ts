import { IProductModel } from "@interfaces";
import {
  validateProductDescription,
  validateProductMetaDescription,
  validateProductMetaTitle,
  validateProductSlug,
  validateProductTitle,
} from "./validation-helpers";

export function makeProduct({
  title,
  metaTitle,
  description,
  metaDescription,
  slug,
}: IProductModel): Readonly<IProductModel> {
  validateProductTitle(title);

  metaTitle && validateProductMetaTitle(title);

  validateProductDescription(description);

  metaDescription && validateProductMetaDescription(metaDescription);

  validateProductSlug(slug);

  return Object.freeze({
    title,
    metaTitle: metaTitle ?? title,
    description,
    metaDescription: metaDescription ?? description,
    slug,
  });
}
