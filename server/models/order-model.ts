import { IOrderDocument } from "@interfaces";
import { model, Schema } from "mongoose";

const OrderSchema = new Schema<IOrderDocument>(
  {
    user: { type: String },
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
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
    status: {
      type: String,
      enum: [
        "pending", // Customer started the checkout process but did not complete it.
        "awaiting_payment", // Customer has completed the checkout process, but payment has yet to be confirmed.
        "payment_failed", // Customer has completed the checkout process, but payment has failed.
        "paid", // Customer has completed the checkout process and payment has been confirmed.
        "fulfilled", // Order has been picked and packed and is awaiting collection from a shipping provider.
        "shipped", // Order has been shipped, but receipt has not been confirmed.
        "partially_shipped", // Only some items in the order have been shipped.
        "completed", // Order has been shipped/picked up, and receipt is confirmed.
        "cancelled", // Seller/customer has cancelled an order.
        "declined", // Seller has marked the order as declined.
        "refunded", // Seller has refunded the whole order.
        "partially_refunded", // Seller has partially refunded the order.
        "disputed", // Customer/Seller has initiated a dispute resolution process for the transaction.
        "manual_verification_required", // Order on hold while some aspect, such as tax-exempt documentation, is manually confirmed.
      ],
      default: "pending",
    },
    total: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const OrderModel = model<IOrderDocument>("Order", OrderSchema);

export default OrderModel;
