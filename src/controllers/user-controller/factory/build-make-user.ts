import { IRandomObject, IUserModel } from "../../../interfaces";
import { IHasher } from "../../../libs/password-utils";
import { IValidator } from "../../../libs/validator";
import CustomError from "../../../libs/errors/custom-error";

export interface IBuildMakeUser {
  (config: IRandomObject, hasher: IHasher, validator: IValidator): IMakeUser;
}

export interface IMakeUser {
  (user: IUserModel): Promise<IUserModel>;
}

export const buildMakeUser: IBuildMakeUser = (config, hasher, validator) => {
  const { minmax, isEmail, isString } = validator;
  const {
    FIRST_NAME_MIN,
    FIRST_NAME_MAX,
    LAST_NAME_MIN,
    LAST_NAME_MAX,
    PASSWORD_MIN,
    PASSWORD_MAX,
  } = config;

  return async ({ firstName, lastName, email, password }: IUserModel) => {
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
      throw new CustomError(
        `Email is invalid. Expected string, but received ${typeof email}.`,
        400
      );
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

    const hashedPassword = await hasher(password);

    return { firstName, lastName, email, password: hashedPassword };
  };
};
