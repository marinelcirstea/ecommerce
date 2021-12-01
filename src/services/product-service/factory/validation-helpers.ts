import CustomError from "@libs/custom-error";
import { isString, minmax } from "@libs/string-utils";

export function validateProductTitle(title: string) {
  if (!isString(title)) {
    throw new CustomError(
      `Product title is invalid. Expected string, but received ${typeof title}.`,
      400
    );
  }

  if (!minmax(title, 1, 160)) {
    // TODO: move min and max to constant variables in configs
    throw new CustomError(`Product title is invalid. Keep it between 1 and 160 characters.`, 400);
  }
}

export function validateProductSlug(slug: string) {
  // (?=[A-Z0-9-]{1,160}$) // if slug.length statement is faster than lookup
  const reg = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;

  if (typeof slug !== "string") {
    throw new CustomError(`Slug is invalid. Expected string, but received ${typeof slug}.`, 400);
  }

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
