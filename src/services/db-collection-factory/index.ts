import UserModel from "@models/user-model";
import useCollection from "./use-collection";

const userCollection = useCollection(UserModel);

export { userCollection };
