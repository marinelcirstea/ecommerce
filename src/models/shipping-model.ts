import { IShippingDocument } from "@interfaces";
import { model, Schema } from "mongoose";

const ShippingSchema = new Schema<IShippingDocument>(
  {
    title: { type: String, required: true },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ShippingModel = model<IShippingDocument>("Shipping", ShippingSchema);

export default ShippingModel;
