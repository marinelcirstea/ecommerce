import { IProductModel } from "@interfaces";
import {
  validateProductDescription,
  validateProductMetaDescription,
  validateProductMetaTitle,
  validateProductSlug,
  validateProductTitle,
} from "./validation-helpers";

export async function makeProduct({
  title,
  metaTitle,
  description,
  metaDescription,
  slug,
}: IProductModel): Promise<Readonly<IProductModel>> {
  validateProductTitle(title);
  validateProductMetaTitle(title);
  validateProductDescription(description);
  validateProductMetaDescription(metaDescription);
  validateProductSlug(slug);

  return Object.freeze({
    title,
    metaTitle,
    description,
    metaDescription,
    slug,
  });
}
