import { IUserDocument } from "../interfaces";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = model<IUserDocument>("User", UserSchema);

export default User;

// stores: [
//   {
//     storeId: { type: Schema.Types.ObjectId, ref: "Store" },
//     name: {
//       type: String,
//       required: [true, "Shop name is required!"],
//       trim: true,
//     },
//     subdomain: {
//       type: String,
//       required: [true, "Subdomain is required!"],
//       unique: true,
//       trim: true,
//     },
//     access: {
//       admin: { type: Boolean, default: false },
//       products: { type: Boolean, default: false },
//       customers: { type: Boolean, default: false },
//       orders: { type: Boolean, default: false },
//       blog: { type: Boolean, default: false },
//       settings: { type: Boolean, default: false },
//     },
//   },
// ],
