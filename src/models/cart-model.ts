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
    // createdAt: { type: Date, default: Date.now(), expires: "7d" },
  },
  { timestamps: true }
);

const CartModel = model<ICartDocument>("Cart", CartSchema);

export default CartModel;
