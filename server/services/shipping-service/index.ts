import { IShippingModel, KeysOfModel } from "@interfaces/";
import CustomError from "@libs/custom-error";
import Shipping from "@models/shipping-model";

// TODO: create validation

async function createShippingOption(shippingData: IShippingModel) {
  const newShippingOption = new Shipping(shippingData);

  await newShippingOption.save();

  return newShippingOption;
}

async function getShippingOption(id: string) {
  const found = await Shipping.findOne({ _id: id });
  if (!found) {
    throw new CustomError("Shipping option not found.", 404);
  }

  return found;
}

async function getAllShippingOptions() {
  const found = await Shipping.find();
  if (!found[0]) {
    throw new CustomError("No shipping options found.", 404);
  }

  return found;
}

async function updateShippingOption(id: string, data: KeysOfModel<IShippingModel>) {
  const ack = await Shipping.updateOne({ _id: id }, data, { upsert: false });

  if (!ack.acknowledged) {
    // TODO: add critical error logging
    throw new CustomError(`Failed to update shipping option.`, 400);
  }
}

async function deleteShippingOption(id: string) {
  const del = await Shipping.deleteOne({ _id: id });
  if (del.deletedCount === 0) {
    throw new Error(`Failed to delete document from shipping collection.`);
  }
}

export default Object.freeze({
  createShippingOption,
  getShippingOption,
  getAllShippingOptions,
  updateShippingOption,
  deleteShippingOption,
});
