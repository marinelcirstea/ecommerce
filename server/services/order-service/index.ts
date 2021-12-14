import { IOrderModel, KeysOfModel } from "@interfaces/";
import CustomError from "@libs/custom-error";
import Order from "@models/order-model";

async function createOrder(orderData: IOrderModel) {
  //todo: Create validation
  const newOrder = new Order(orderData);

  await newOrder.save();

  return newOrder;
}

async function getOrder(id: string) {
  const order = await Order.findOne({ _id: id }).lean();

  if (!order) {
    throw new CustomError("Order not found.", 404);
  }

  return order;
}

async function updateOrder(id: string, data: KeysOfModel<IOrderModel>) {
  const ack = await Order.updateOne({ _id: id }, data, { upsert: false, new: true });

  if (!ack.acknowledged) {
    // TODO: add critical error logging
    throw new CustomError(`Failed to update order.`, 400);
  }
}

export default Object.freeze({
  createOrder,
  getOrder,
  updateOrder,
});
