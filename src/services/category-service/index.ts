import { IFilterOptions, ICategoryModel } from "@interfaces/";

//
// TODO: Add relevant types
//

async function createCategory(reqBody: ICategoryModel) {}

async function getCategory(filter: any, options?: IFilterOptions) {}

async function updateCategory(filter: any, data: any) {}

async function deleteCategory(filter: any) {}

export default Object.freeze({
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
});
