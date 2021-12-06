import { IFilterOptions, IProductModel } from "@interfaces/";
import CustomError from "@libs/custom-error";
import obj from "@libs/object-utils";
import { productCollection } from "@services/db-collection-factory";
import { makeProduct } from "./factory";
import { makeUpdateProduct } from "./factory";

//
// TODO: Add relevant types
//

async function createProduct(reqBody: IProductModel) {
  // this is more like validation, not an actual factory..
  // it could actually just go through validation without returning anything
  // Unless we decide to create the slugs server-side or do some future changes
  const validProduct = makeProduct(reqBody);

  const newProduct = await productCollection.createOne(validProduct);

  return newProduct;
}

async function getProduct(filter: any, options?: IFilterOptions) {
  if (!filter || !Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const product = await productCollection.findOne(filter);

  if (!product) {
    throw new CustomError("Product not found.", 404);
  }

  if (!options) return product;

  const { exclude, pick } = options;

  // you can't include and exclude fields at the same time.
  if (exclude && pick) {
    throw new Error("You can either use `options.exclude` or `options.pick`. NOT BOTH!");
  }

  // delete everything passed in 'options.exclude' array
  if (exclude && exclude[0]) {
    return obj(product).exclude(exclude);
  }

  // delete everything, except what's in "options.pick" array
  if (pick && pick[0]) {
    return obj(product).pick(pick);
  }
}

async function updateProduct(filter: any, data: any) {
  if (!filter || !Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const validUpdate = makeUpdateProduct(data);

  const ack = await productCollection.updateOne(filter, validUpdate);
  if (!ack.acknowledged) {
    // TODO: add critical error logging
    throw new CustomError(`Failed to update product.`, 400);
  }
}

async function deleteProduct(filter: any) {
  const del = await productCollection.deleteOne(filter);

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
