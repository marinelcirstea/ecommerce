/**
 * We're doing this to avoid depending on mongoose.
 *
 * If we want to change the database to something like mysql, we just modify
 * the logic in this file instead of changing the whole codebase.
 *
 */
import { FilterQuery, Model } from "mongoose";

export type IFilterQuery = FilterQuery<Model<any>>;

function useCollection(DbModel: Model<any>) {
  return Object.freeze({
    findOne,
    deleteOne,
    createOne,
    updateOne,
  });

  async function findOne(filter: IFilterQuery) {
    return await DbModel.findOne(filter).lean();
  }

  async function deleteOne(filter: IFilterQuery) {
    return await DbModel.deleteOne(filter);
  }

  async function createOne(data: { [key: string]: any }) {
    const newDbDocument = new DbModel(data);

    await newDbDocument.save();

    return newDbDocument;
  }
  async function updateOne(filter: IFilterQuery, data: { [key: string]: any }) {
    return await DbModel.updateOne(filter, data, { upsert: false });
  }
}

export default useCollection;
