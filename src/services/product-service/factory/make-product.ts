import { IProductModel } from "@interfaces";
import {
  validateProductDescription,
  validateProductMetaDescription,
  validateProductMetaTitle,
  validateProductPrice,
  validateProductSlug,
  validateProductTitle,
} from "./validation-helpers";

export function makeProduct({
  title,
  metaTitle,
  description,
  metaDescription,
  slug,
  price,
}: IProductModel): Readonly<IProductModel> {
  validateProductTitle(title);

  metaTitle && validateProductMetaTitle(title);

  validateProductDescription(description);

  metaDescription && validateProductMetaDescription(metaDescription);

  validateProductSlug(slug);
  validateProductPrice(price);

  return Object.freeze({
    title,
    metaTitle: metaTitle ?? title,
    description,
    metaDescription: metaDescription ?? description,
    slug,
    price,
  });
}
