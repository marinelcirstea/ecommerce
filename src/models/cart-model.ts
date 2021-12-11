import { ICartDocument } from "@interfaces";
import { model, Schema } from "mongoose";

const CartSchema = new Schema<ICartDocument>(
  {
    items: [
      {
        // populated with title, _id and price
        item: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    userId: { type: String }, // pointless to create a refference to User collection
    deviceId: { type: String },
  },
  { timestamps: true }
);

const CartModel = model<ICartDocument>("Cart", CartSchema);

export default CartModel;
