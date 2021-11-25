import { min, IMin } from "./min";
import { max, IMax } from "./max";
import { minmax, IMinmax } from "./minmax";
import { isEmail, IIsEmail } from "./isEmail";
import { isString, IIsString } from "./isString";

export interface IValidator {
  min: IMin;
  max: IMax;
  minmax: IMinmax;
  isEmail: IIsEmail;
  isString: IIsString;
}

export const validator: IValidator = {
  min,
  max,
  minmax,
  isEmail,
  isString,
};
