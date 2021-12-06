// pretty much copy paste from product validation
// maybe we should create a higher level factory
// to avoid duplicates.
import CustomError from "@libs/custom-error";
import { isString, minmax } from "@libs/string-utils";
import GC from "@configs";

export function validateCategoryTitle(title: string) {
  if (!isString(title)) {
    throw new CustomError(
      `Category title is invalid. Expected string, but received ${typeof title}.`,
      400
    );
  }

  if (!minmax(title, GC.CATEGORY_TITLE_MIN_LENGTH, GC.CATEGORY_TITLE_MAX_LENGTH)) {
    throw new CustomError(
      `Category title is invalid. Keep it between ${GC.CATEGORY_TITLE_MIN_LENGTH} and ${GC.CATEGORY_TITLE_MAX_LENGTH} characters.`,
      400
    );
  }
}

// meta description has the same limitations as title.
// Created another function for relevant error display
export function validateCategoryMetaTitle(metaTitle: string) {
  if (!isString(metaTitle)) {
    throw new CustomError(
      `Category meta title is invalid. Expected string, but received ${typeof metaTitle}.`,
      400
    );
  }

  if (!minmax(metaTitle, GC.CATEGORY_TITLE_MIN_LENGTH, GC.CATEGORY_TITLE_MAX_LENGTH)) {
    throw new CustomError(
      `Category meta title is invalid. Keep it between ${GC.CATEGORY_TITLE_MIN_LENGTH} and ${GC.CATEGORY_TITLE_MAX_LENGTH} characters.`,
      400
    );
  }
}

export function validateCategoryDescription(description: string) {
  if (!isString(description)) {
    throw new CustomError(
      `Category description is invalid. Expected string, but received ${typeof description}.`,
      400
    );
  }

  if (
    !minmax(description, GC.CATEGORY_DESCRIPTION_MIN_LENGTH, GC.CATEGORY_DESCRIPTION_MAX_LENGTH)
  ) {
    throw new CustomError(
      `Category description is invalid. Keep it between ${GC.CATEGORY_DESCRIPTION_MIN_LENGTH} and ${GC.CATEGORY_DESCRIPTION_MAX_LENGTH} characters.`,
      400
    );
  }
}

// meta description has the same limitations as descriptions.
// Created another function for relevant error display
export function validateCategoryMetaDescription(metaDescription: string) {
  if (!isString(metaDescription)) {
    throw new CustomError(
      `Category meta description is invalid. Expected string, but received ${typeof metaDescription}.`,
      400
    );
  }

  if (
    !minmax(metaDescription, GC.CATEGORY_DESCRIPTION_MIN_LENGTH, GC.CATEGORY_DESCRIPTION_MAX_LENGTH)
  ) {
    throw new CustomError(
      `Category meta description is invalid. Keep it between ${GC.CATEGORY_DESCRIPTION_MIN_LENGTH} and ${GC.CATEGORY_DESCRIPTION_MAX_LENGTH} characters.`,
      400
    );
  }
}

export function validateCategorySlug(slug: string) {
  if (typeof slug !== "string") {
    throw new CustomError(`Slug is invalid. Expected string, but received ${typeof slug}.`, 400);
  }

  // (?=[A-Z0-9-]{1,160}$) // if(slug.length) is faster than lookup
  const reg = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/i;

  // TODO? Should we create slugs for the categories that (somehow)come without them?
  // if (!slug) {
  // create slug
  // }

  if (slug.length > 160) {
    throw new CustomError("Max slug length is 160 characters.", 400);
  }

  if (!reg.test(slug)) {
    throw new CustomError(
      "Slug is invalid. It can only contain Latin characters(a-z, no accents), numbers and dashes.",
      400
    );
  }
}
