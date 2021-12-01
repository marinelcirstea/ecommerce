import CustomError from "@libs/custom-error";
import { isString, minmax } from "@libs/string-utils";
import GC from "@configs";

export function validateProductTitle(title: string) {
  if (!isString(title)) {
    throw new CustomError(
      `Product title is invalid. Expected string, but received ${typeof title}.`,
      400
    );
  }

  if (!minmax(title, GC.PRODUCT_TITLE_MIN_LENGTH, GC.PRODUCT_TITLE_MAX_LENGTH)) {
    // TODO: move min and max to constant variables in configs
    throw new CustomError(
      `Product title is invalid. Keep it between ${GC.PRODUCT_TITLE_MIN_LENGTH} and ${GC.PRODUCT_TITLE_MAX_LENGTH} characters.`,
      400
    );
  }
}

export function validateProductMetaTitle(metaTitle: string) {
  if (!isString(metaTitle)) {
    throw new CustomError(
      `Product meta title is invalid. Expected string, but received ${typeof metaTitle}.`,
      400
    );
  }

  if (!minmax(metaTitle, GC.PRODUCT_META_TITLE_MIN_LENGTH, GC.PRODUCT_META_TITLE_MAX_LENGTH)) {
    // TODO: move min and max to constant variables in configs
    throw new CustomError(
      `Product meta title is invalid. Keep it between ${GC.PRODUCT_META_TITLE_MIN_LENGTH} and ${GC.PRODUCT_META_TITLE_MAX_LENGTH} characters.`,
      400
    );
  }
}

export function validateProductDescription(description: string) {
  if (!isString(description)) {
    throw new CustomError(
      `Product description is invalid. Expected string, but received ${typeof description}.`,
      400
    );
  }

  if (!minmax(description, GC.PRODUCT_DESCRIPTION_MIN_LENGTH, GC.PRODUCT_DESCRIPTION_MAX_LENGTH)) {
    // TODO: move min and max to constant variables in configs
    throw new CustomError(
      `Product description is invalid. Keep it between ${GC.PRODUCT_DESCRIPTION_MIN_LENGTH} and ${GC.PRODUCT_DESCRIPTION_MAX_LENGTH} characters.`,
      400
    );
  }
}

// meta description has the same limitations as descriptions.
// Created another function for relevant error display
export function validateProductMetaDescription(metaDescription: string) {
  if (!isString(metaDescription)) {
    throw new CustomError(
      `Product meta description is invalid. Expected string, but received ${typeof metaDescription}.`,
      400
    );
  }

  if (
    !minmax(metaDescription, GC.PRODUCT_DESCRIPTION_MIN_LENGTH, GC.PRODUCT_DESCRIPTION_MAX_LENGTH)
  ) {
    // TODO: move min and max to constant variables in configs
    throw new CustomError(
      `Product meta description is invalid. Keep it between ${GC.PRODUCT_DESCRIPTION_MIN_LENGTH} and ${GC.PRODUCT_DESCRIPTION_MAX_LENGTH} characters.`,
      400
    );
  }
}

export function validateProductSlug(slug: string) {
  if (typeof slug !== "string") {
    throw new CustomError(`Slug is invalid. Expected string, but received ${typeof slug}.`, 400);
  }

  // (?=[A-Z0-9-]{1,160}$) // if(slug.length) is faster than lookup
  const reg = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/i;

  // TODO? Should we create slugs for the products that (somehow)come without them?
  // if (!slug) {
  // create slug
  // }

  if (slug.length > 160) {
    throw new CustomError("Max slug length is 160 characters. (We recommend 50-60)", 400);
  }

  if (!reg.test(slug)) {
    throw new CustomError(
      "Slug is invalid. It can only contain Latin letters(a-z, no accents), numbers and dashes.",
      400
    );
  }
}
