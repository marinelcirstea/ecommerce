import {
  CollectionFilter,
  IFilterOptions,
  IProductDocument,
  IProductModel,
  KeysOfModel,
} from "@interfaces/";
import CustomError from "@libs/custom-error";
import obj from "@libs/object-utils";
import { makeProduct } from "./factory";
import { makeUpdateProduct } from "./factory";
import Product from "@models/product-model";

type IFilter = CollectionFilter<IProductDocument>;

async function createProduct(reqBody: IProductModel) {
  const validProduct = makeProduct(reqBody);

  const newProduct = new Product(validProduct);

  await newProduct.save();

  return newProduct;
}

async function getProduct(filter: IFilter, options: IFilterOptions = {}) {
  if (!Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const product = await Product.findOne(filter);

  if (!product) {
    throw new CustomError("Product not found.", 404);
  }

  const { exclude, pick } = options;

  if (Array.isArray(exclude)) {
    return obj(product).exclude(exclude);
  }

  if (Array.isArray(pick)) {
    return obj(product).pick(pick);
  }

  return product;
}

async function updateProduct(filter: IFilter, data: KeysOfModel<IProductModel>) {
  if (!filter || !Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const validUpdate = makeUpdateProduct(data);

  const ack = await Product.updateOne(filter, validUpdate, { upsert: false });
  if (!ack.acknowledged) {
    // TODO: add critical error logging
    throw new CustomError(`Failed to update product.`, 400);
  }
}

async function deleteProduct(filter: IFilter) {
  const del = await Product.deleteOne(filter);

  if (del.deletedCount === 0) {
    throw new Error(`Failed to delete document from products collection.`);
  }
}

export default Object.freeze({
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
});
