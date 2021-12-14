import { ICartModel } from "@interfaces/";
import CustomError from "@libs/custom-error";

export function validateCart(items: ICartModel) {
  if (!Array.isArray(items)) {
    throw new CustomError(`Invalid cart items. Expected array, but received ${typeof items}`, 400);
  }

  return items.filter((item) => item.quantity > 0);
}
