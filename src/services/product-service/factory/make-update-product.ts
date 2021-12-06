import CustomError from "@libs/custom-error";
import {
  validateProductDescription,
  validateProductMetaDescription,
  validateProductMetaTitle,
  validateProductSlug,
  validateProductTitle,
} from "./validation-helpers";

export async function makeUpdateProduct({
  title,
  metaTitle,
  description,
  metaDescription,
  slug,
}: {
  [key: string]: any;
}) {
  // we don't know what keys we'll have to update
  // initialize empty
  const actualUpdateObject: { [key: string]: string } = {};

  if (title) {
    validateProductTitle(title);
    actualUpdateObject.title = title;
  }

  if (metaTitle) {
    validateProductMetaTitle(metaTitle);
    actualUpdateObject.metaTitle = metaTitle;
  }

  if (description) {
    validateProductDescription(description);
    actualUpdateObject.description = description;
  }

  if (metaDescription) {
    validateProductMetaDescription(metaDescription);
    actualUpdateObject.metaDescription = metaDescription;
  }

  if (slug) {
    validateProductSlug(slug);
    actualUpdateObject.slug = slug;
  }
  // Should we throw an error with any unaccepted/unknonw keys?

  // no keys received means that this object is going to be empty
  if (!Object.keys(actualUpdateObject)[0]) {
    throw new CustomError("Nothing to update.", 400);
  }

  return Object.freeze(actualUpdateObject); // return what passed the filter
}
