import CustomError from "@libs/custom-error";
import GC from "@configs";
import { IUserModel } from "@interfaces";
import { minmax, isEmail, isString, hash } from "@libs/string-utils";

const { FIRST_NAME_MIN, FIRST_NAME_MAX, LAST_NAME_MIN, LAST_NAME_MAX, PASSWORD_MIN, PASSWORD_MAX } =
  GC;

export async function makeUser({
  firstName,
  lastName,
  email,
  password,
}: IUserModel): Promise<Readonly<IUserModel>> {
  // type check (mostly for ajax)
  if (!isString(firstName)) {
    throw new CustomError(
      `First name is invalid. Expected string, but received ${typeof firstName}.`,
      400
    );
  }
  if (!isString(lastName)) {
    throw new CustomError(
      `Last name is invalid. Expected string, but received ${typeof lastName}.`,
      400
    );
  }
  if (!isString(password)) {
    throw new CustomError(
      `Password is invalid. Expected string, but received ${typeof password}.`,
      400
    );
  }
  if (!isString(email)) {
    throw new CustomError(`Email is invalid. Expected string, but received ${typeof email}.`, 400);
  }

  // length checks
  if (!minmax(firstName, FIRST_NAME_MIN, FIRST_NAME_MAX)) {
    throw new CustomError(
      `First name is invalid. Keep it between ${FIRST_NAME_MIN} and ${FIRST_NAME_MAX} characters.`,
      400
    );
  }

  if (!minmax(lastName, LAST_NAME_MIN, LAST_NAME_MAX)) {
    throw new CustomError(
      `Last name is invalid. Keep it between ${LAST_NAME_MIN} and ${LAST_NAME_MAX} characters.`,
      400
    );
  }

  if (!minmax(password, PASSWORD_MIN, PASSWORD_MAX)) {
    throw new CustomError(
      `Password is invalid. Keep it between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`,
      400
    );
  }

  // email validation
  if (!isEmail(email)) {
    throw new CustomError("Please provide a valid email.", 400);
  }

  const hashedPassword = await hash(password);

  return Object.freeze({ firstName, lastName, email, password: hashedPassword });
}
