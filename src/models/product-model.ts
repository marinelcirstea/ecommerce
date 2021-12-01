import { IProductDocument } from "@interfaces";
import { model, Schema } from "mongoose";

const ProductSchema = new Schema<IProductDocument>(
  {
    title: { type: String, required: true },
    metaTitle: { type: String, required: true },
    description: { type: String, required: true },
    metaDescription: { type: String, required: true },
    slug: { type: String, required: true },
    // add the rest later
  },
  { timestamps: true }
);

const ProductModel = model<IProductDocument>("Product", ProductSchema);

export default ProductModel;
