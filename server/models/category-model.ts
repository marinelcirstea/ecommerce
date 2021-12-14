import { ICategoryDocument } from "@interfaces";
import { model, Schema } from "mongoose";

const CategorySchema = new Schema<ICategoryDocument>(
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

const CategoryModel = model<ICategoryDocument>("Category", CategorySchema);

export default CategoryModel;
