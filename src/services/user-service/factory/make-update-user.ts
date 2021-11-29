import CustomError from "@libs/custom-error";
import { hash, isEmail, isString, minmax } from "@libs/string-utils";
import GC from "@configs";

const { FIRST_NAME_MIN, FIRST_NAME_MAX, LAST_NAME_MIN, LAST_NAME_MAX, PASSWORD_MIN, PASSWORD_MAX } =
  GC;

export async function makeUpdateUser(data: { [key: string]: any }) {
  // we don't know what keys we receive, don't destructure
  // only accept what's in the switch, get rid of anything else

  // if empty, there's nothing to update
  if (!Object.keys(data)[0]) {
    throw new CustomError("Nothing to update.", 400);
  }

  // we don't know what keys we'll have to update
  // initialize empty
  const newObject: { [key: string]: string } = {};

  Object.keys(data).forEach(async (key) => {
    switch (key) {
      case "firstName":
        const firstName = data[key];

        if (!isString(firstName)) {
          throw new CustomError(
            `First name is invalid. Expected string, but received ${typeof firstName}.`,
            400
          );
        }

        if (!minmax(firstName, FIRST_NAME_MIN, FIRST_NAME_MAX)) {
          throw new CustomError(
            `First name is invalid. Keep it between ${FIRST_NAME_MIN} and ${FIRST_NAME_MAX} characters.`,
            400
          );
        }

        newObject.firstName = firstName;

        break;

      case "lastName":
        const lastName = data[key];

        if (!isString(lastName)) {
          throw new CustomError(
            `Last name is invalid. Expected string, but received ${typeof lastName}.`,
            400
          );
        }

        if (!minmax(lastName, LAST_NAME_MIN, LAST_NAME_MAX)) {
          throw new CustomError(
            `Last name is invalid. Keep it between ${LAST_NAME_MIN} and ${LAST_NAME_MAX} characters.`,
            400
          );
        }

        newObject.lastName = lastName;

        break;

      case "email":
        const email = data[key];

        if (!isString(email)) {
          throw new CustomError(
            `Email is invalid. Expected string, but received ${typeof email}.`,
            400
          );
        }

        if (!isEmail(email)) {
          throw new CustomError("Please provide a valid email.", 400);
        }

        newObject.email = email;

        break;

      case "password":
        const password = data[key];

        if (!isString(password)) {
          throw new CustomError(
            `Password is invalid. Expected string, but received ${typeof password}.`,
            400
          );
        }

        if (!minmax(password, PASSWORD_MIN, PASSWORD_MAX)) {
          throw new CustomError(
            `Password is invalid. Keep it between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`,
            400
          );
        }

        const hashedPassword = await hash(password);

        newObject.password = hashedPassword;

        break;
    }
  });

  // we might receive keys that aren't in the user model,
  // if all keys are wrong, they won't be picked up by the switch filter
  // so this object is going to be empty
  if (!Object.keys(newObject)[0]) {
    throw new CustomError("Nothing to update.", 400);
  }

  return Object.freeze(newObject); // return what passed the switch
}
