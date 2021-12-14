import { IUserDocument } from "@interfaces";
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

const UserModel = model<IUserDocument>("User", UserSchema);

export default UserModel;
