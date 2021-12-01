import ProductModel from "@models/product-model";
import UserModel from "@models/user-model";
import useCollection from "./use-collection";

const userCollection = useCollection(UserModel);
const productCollection = useCollection(ProductModel);

export { userCollection, productCollection };
