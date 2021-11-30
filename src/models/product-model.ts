import { IProductDocument } from "@interfaces";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<IProductDocument>(
  {
    title: { type: String, required: true },
    metaTitle: { type: String },
    description: { type: String },
    metaDescription: { type: String },
    slug: { type: String, required: true },
    // add the rest later
  },
  { timestamps: true }
);

const UserModel = model<IProductDocument>("User", UserSchema);

export default UserModel;
