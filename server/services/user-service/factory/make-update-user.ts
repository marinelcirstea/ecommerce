import CustomError from "@libs/custom-error";
import { hash } from "@libs/string-utils";
import {
  validateUserEmail,
  validateUserFistName,
  validateUserLastName,
  validateUserPassword,
} from "./validation-helpers";

export async function makeUpdateUser({
  firstName,
  lastName,
  email,
  password,
}: {
  [key: string]: any;
}) {
  // we don't know what keys we'll have to update
  // initialize empty
  const actualUpdateObject: { [key: string]: string } = {};

  if (firstName) {
    validateUserFistName(firstName);
    actualUpdateObject.firstName = firstName;
  }

  if (lastName) {
    validateUserLastName(lastName);
    actualUpdateObject.lastName = lastName;
  }

  if (email) {
    validateUserEmail(email);
    actualUpdateObject.email = email;
  }

  if (password) {
    validateUserPassword(password);
    const hashedPassword = await hash(password);

    actualUpdateObject.password = hashedPassword;
  }
  // Should we throw an error with any unaccepted/unknonw keys?

  // no keys received means that this object is going to be empty
  if (!Object.keys(actualUpdateObject)[0]) {
    throw new CustomError("Nothing to update.", 400);
  }

  return Object.freeze(actualUpdateObject); // return what passed the filter
}
