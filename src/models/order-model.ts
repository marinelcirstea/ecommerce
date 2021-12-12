import { IOrderDocument } from "@interfaces";
import { model, Schema } from "mongoose";

const OrderSchema = new Schema<IOrderDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: [],
    itemsTotal: { type: Number, required: true },
    shipping: { type: Schema.Types.ObjectId, ref: "Shipping" },
    address: {
      country: { type: String },
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    total: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const OrderModel = model<IOrderDocument>("Order", OrderSchema);

export default OrderModel;
