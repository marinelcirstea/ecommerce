import { hash as hasher, compare as comparer } from "bcryptjs";
import GC from "@configs";

export interface IHasher {
  (str: string): Promise<string>;
}
export interface IComparer {
  (str: string, hash: string): Promise<boolean>;
}

export const hash: IHasher = async (str) => {
  if (typeof str !== "string") {
    throw new Error(`Expected string, received ${typeof str}`);
  }

  const salt = GC.PASSWORD_SALT || 10;

  const hashedString = await hasher(str, salt);

  return hashedString;
};

export const compare: IComparer = async (str, hash) => {
  if (typeof str !== "string" || typeof hash !== "string") {
    throw new Error(`Expected (string, string), received (${typeof str}, ${typeof hash})`);
  }

  const isMatch = await comparer(str, hash);

  return isMatch;
};
