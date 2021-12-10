import {
  CollectionFilter,
  IFilterOptions,
  IUserDocument,
  IUserModel,
  KeysOfModel,
} from "@interfaces/";
import CustomError from "@libs/custom-error";
import { makeUser } from "./factory";
import { makeUpdateUser } from "./factory/make-update-user";
import obj from "@libs/object-utils";
import User from "@models/user-model";

type IFilter = CollectionFilter<IUserDocument>;

async function createUser(userData: IUserModel) {
  const validUser = await makeUser(userData);

  const exists = await User.findOne({ email: validUser.email });

  if (exists) {
    throw new CustomError("This email is already in use, try to log in instead.", 400);
  }

  const newUser = new User(validUser);
  await newUser.save();

  return newUser;
}

async function getUser(filter: IFilter, options: IFilterOptions = {}) {
  if (!Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const user = await User.findOne(filter);

  if (!user) {
    throw new CustomError("User not found.", 404);
  }

  const { exclude, pick } = options;

  if (Array.isArray(exclude)) {
    return obj(user).exclude(exclude);
  }

  if (Array.isArray(pick)) {
    return obj(user).pick(pick);
  }

  return user;
}

async function updateUser(filter: IFilter, data: KeysOfModel<IUserModel>) {
  if (!filter || !Object.keys(filter)[0]) {
    throw new Error("Empty object passed as collection filter.");
  }
  const validUpdate = await makeUpdateUser(data);

  const ack = await User.updateOne(filter, validUpdate, { upsert: false });
  if (!ack.acknowledged) {
    // TODO: add critical error logging
    throw new CustomError(`Failed to update user.`, 400);
  }
}

async function deleteUser(filter: IFilter) {
  const del = await User.deleteOne(filter);

  if (del.deletedCount === 0) {
    throw new Error(`Failed to delete document from users collection.`);
  }
}

export default Object.freeze({
  createUser,
  getUser,
  updateUser,
  deleteUser,
});
