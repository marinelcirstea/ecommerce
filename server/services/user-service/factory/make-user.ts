import { IUserModel } from "@interfaces";
import { hash } from "@libs/string-utils";
import {
  validateUserEmail,
  validateUserFistName,
  validateUserLastName,
  validateUserPassword,
} from "./validation-helpers";

export async function makeUser({
  firstName,
  lastName,
  email,
  password,
}: IUserModel): Promise<Readonly<IUserModel>> {
  validateUserFistName(firstName);
  validateUserLastName(lastName);
  validateUserEmail(email);
  validateUserPassword(password);

  const hashedPassword = await hash(password);

  return Object.freeze({ firstName, lastName, email, password: hashedPassword });
}
