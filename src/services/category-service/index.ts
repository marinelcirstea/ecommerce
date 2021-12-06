import { IFilterOptions, ICategoryModel } from "@interfaces/";
import CustomError from "@libs/custom-error";
import obj from "@libs/object-utils";
import { categoryCollection } from "@services/db-collection-factory";
import { makeCategory } from "./factory";

//
// TODO: Add relevant types
//

async function createCategory(reqBody: ICategoryModel) {
  // this is more like validation, not an actual factory..
  // it could actually just go through validation without returning anything
  // Unless we decide to create the slugs server-side or do some future changes
  const validCategory = makeCategory(reqBody);

  const newCategory = await categoryCollection.createOne(validCategory);

  return newCategory;
}

async function getCategory(filter: any, options?: IFilterOptions) {
  if (!filter || !Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const category = await categoryCollection.findOne(filter);

  if (!category) {
    throw new CustomError("Category not found.", 404);
  }

  if (!options) return category;

  const { exclude, pick } = options;

  // you can't include and exclude fields at the same time.
  if (exclude && pick) {
    throw new Error("You can either use `options.exclude` or `options.pick`. NOT BOTH!");
  }

  // delete everything passed in 'options.exclude' array
  if (exclude && exclude[0]) {
    return obj(category).exclude(exclude);
  }

  // delete everything, except what's in "options.pick" array
  if (pick && pick[0]) {
    return obj(category).pick(pick);
  }
}

async function updateCategory(filter: any, data: any) {}

async function deleteCategory(filter: any) {}

export default Object.freeze({
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
});
