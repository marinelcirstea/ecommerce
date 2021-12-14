import CustomError from "@libs/custom-error";
import {
  validateCategoryDescription,
  validateCategoryMetaDescription,
  validateCategoryMetaTitle,
  validateCategorySlug,
  validateCategoryTitle,
} from "./validation-helpers";

export function makeUpdateCategory({
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
    validateCategoryTitle(title);
    actualUpdateObject.title = title;
  }

  if (metaTitle) {
    validateCategoryMetaTitle(metaTitle);
    actualUpdateObject.metaTitle = metaTitle;
  }

  if (description) {
    validateCategoryDescription(description);
    actualUpdateObject.description = description;
  }

  if (metaDescription) {
    validateCategoryMetaDescription(metaDescription);
    actualUpdateObject.metaDescription = metaDescription;
  }

  if (slug) {
    validateCategorySlug(slug);
    actualUpdateObject.slug = slug;
  }
  // Should we throw an error with any unaccepted/unknonw keys?

  // no keys received means that this object is going to be empty
  if (!Object.keys(actualUpdateObject)[0]) {
    throw new CustomError("Nothing to update.", 400);
  }

  return Object.freeze(actualUpdateObject); // return what passed the filter
}
