import { IFilterOptions, ICategoryModel } from "@interfaces/";
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

async function getCategory(filter: any, options?: IFilterOptions) {}

async function updateCategory(filter: any, data: any) {}

async function deleteCategory(filter: any) {}

export default Object.freeze({
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
});
