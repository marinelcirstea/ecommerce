import CustomError from "@libs/custom-error";
import { isEmail, isString, minmax } from "@libs/string-utils";
import GC from "@configs";

const { FIRST_NAME_MIN, FIRST_NAME_MAX, LAST_NAME_MIN, LAST_NAME_MAX, PASSWORD_MIN, PASSWORD_MAX } =
  GC;

export function validateUserFistName(firstName: string) {
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
}

export function validateUserLastName(lastName: string) {
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
}

export function validateUserEmail(email: string) {
  if (!isString(email)) {
    throw new CustomError(`Email is invalid. Expected string, but received ${typeof email}.`, 400);
  }

  if (!isEmail(email)) {
    throw new CustomError("Please provide a valid email.", 400);
  }
}

export function validateUserPassword(password: string) {
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
}
