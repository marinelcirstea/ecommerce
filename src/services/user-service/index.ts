import { IUserModel } from "@interfaces/";
import { userCollection } from "../db-collection-factory";
import CustomError from "@libs/custom-error";
import { makeUser } from "./factory";
import { makeUpdateUser } from "./factory/make-update-user";
import obj from "@libs/object-utils";

//
// TODO: add relevant types to arguments
//

async function createUser(userData: IUserModel) {
  const validUser = await makeUser(userData);

  const exists = await userCollection.findOne({ email: validUser.email });

  if (exists) {
    throw new CustomError("This email is already in use, try to log in instead.", 400);
  }

  const newUser = await userCollection.createOne(validUser);

  return newUser;
}

export interface IFilterOptions {
  exclude?: string[];
  pick?: string[];
}

async function getUser(filter: any, options?: IFilterOptions) {
  if (!filter || !Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const user = await userCollection.findOne(filter);

  if (!user) {
    throw new CustomError("User not found.", 404);
  }

  if (!options) return user;

  const { exclude, pick } = options;

  // you can't include and exclude fields at the same time.
  if (exclude && pick) {
    throw new Error("You can either use `options.exclude` or `options.pick`. NOT BOTH!");
  }

  // delete everything passed in 'options.exclude' array
  if (exclude && exclude[0]) {
    return obj(user).exclude(exclude);
  }

  // delete everything, except what's in "options.pick" array
  if (pick && pick[0]) {
    return obj(user).pick(pick);
  }
}

async function updateUser(filter: any, data: any) {
  if (!filter || !Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const validUpdate = await makeUpdateUser(data);

  const ack = await userCollection.updateOne(filter, validUpdate);
  if (!ack.acknowledged) {
    // TODO: add critical error logging
    throw new CustomError(`Failed to update user.`, 400);
  }
}

async function deleteUser(filter: any) {
  const del = await userCollection.deleteOne(filter);

  if (del.deletedCount === 0) {
    throw new Error(`Failed to delete document from users collection.`);
  }
}

//
export default Object.freeze({
  createUser,
  getUser,
  updateUser,
  deleteUser,
});
