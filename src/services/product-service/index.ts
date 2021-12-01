import { IProductModel } from "@interfaces/";
import { productCollection } from "@services/db-collection-factory";
import { makeProduct } from "./factory";

//
// TODO: Add relevant types
//

async function createProduct(reqBody: IProductModel) {
  // this is more like validation, not an actual factory..
  // it could actually just go through validation without returning anything
  // Unless we decide to create the slugs server-side or do some future changes
  const validProduct = await makeProduct(reqBody);

  const newProduct = await productCollection.createOne(validProduct);

  return newProduct;
}

async function getProduct() {}

async function updateProduct() {}

async function deleteProduct() {}

export default Object.freeze({
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
});
