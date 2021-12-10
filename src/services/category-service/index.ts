import {
  IFilterOptions,
  ICategoryModel,
  ICategoryDocument,
  KeysOfModel,
  CollectionFilter,
} from "@interfaces/";
import CustomError from "@libs/custom-error";
import obj from "@libs/object-utils";
import { makeCategory, makeUpdateCategory } from "./factory";
import Category from "@models/category-model";

type IFilter = CollectionFilter<ICategoryDocument>;

async function createCategory(reqBody: ICategoryModel) {
  const validCategory = makeCategory(reqBody);

  const newCategory = new Category(validCategory);

  await newCategory.save();

  return newCategory;
}

async function getCategory(filter: IFilter, options: IFilterOptions = {}) {
  if (!Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }

  const category = await Category.findOne(filter);

  if (!category) {
    throw new CustomError("Category not found.", 404);
  }

  const { exclude, pick } = options;

  if (Array.isArray(exclude)) {
    return obj(category).exclude(exclude);
  }

  if (Array.isArray(pick)) {
    return obj(category).pick(pick);
  }

  return category;
}

async function updateCategory(filter: IFilter, data: KeysOfModel<ICategoryModel>) {
  if (!Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }

  const validUpdate = makeUpdateCategory(data);

  const ack = await Category.updateOne(filter, validUpdate, { upsert: false });
  if (!ack.acknowledged) {
    // TODO: add critical error logging
    throw new CustomError(`Failed to update category.`, 400);
  }
}

async function deleteCategory(filter: IFilter) {
  const del = await Category.deleteOne(filter);

  if (del.deletedCount === 0) {
    throw new Error(`Failed to delete document from categories collection.`);
  }
}

export default Object.freeze({
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
});
