import { FilterQuery, Model } from "mongoose";

export interface ISomeObject {
  [key: string]: any;
}
export enum Cookies {
  AccessToken = "access",
  RefreshToken = "refresh",
}

export interface AccessTokenPayload {
  userId: string;
}

export interface AccessToken extends AccessTokenPayload {
  exp: number;
  iat: number;
}

export interface RefreshTokenPayload {
  userId: string;
  version: number;
}

export interface RefreshToken extends RefreshTokenPayload {
  exp: number;
  iat: number;
}

export interface IStoreAccess {
  admin: boolean;
  products: boolean;
  customers: boolean;
  orders: boolean;
  blog: boolean;
  settings: boolean;
}

export interface IStore {
  storeId: string;
  name: string;
  subdomain: string;
  access: IStoreAccess;
}
export interface IUserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IUserDocument extends IUserModel {
  _id: string;
  tokenVersion: number;
}

// interface IProductModelImageStructure {
//   order: number;
//   url: string;
//   _id?: string;
// }

// interface IProductModelCategoryStructure {
//   title: string;
//   categoryId: string;
// }

export interface IProductModel {
  title: string;
  metaTitle: string;
  description: string;
  metaDescription: string;
  slug: string;
  price: number;
  // categories: IProductModelCategoryStructure[];
  // thumbnail?: string;
  // images?: IProductModelImageStructure[];
}

export interface IProductDocument extends IProductModel {
  _id: string;
}

// interface ICategoryModelImageStructure {
//   order: number;
//   url: string;
//   _id?: string;
// }

export interface ICategoryModel {
  title: string;
  metaTitle: string;
  description: string;
  metaDescription: string;
  slug: string;
  // thumbnail?: string;
  // images?: ICategoryModelImageStructure[];
}

export interface ICategoryDocument extends ICategoryModel {
  _id: string;
}

/**
 * @type Model Mongoose Model
 */
export type KeysOfModel<Model> = { [key in keyof Model]?: Model[key] };

/**
 * @type Doc Mongoose Document Model
 */
export type CollectionFilter<Doc> = FilterQuery<Model<Doc>>;

export interface IFilterOptions {
  exclude?: string[];
  pick?: string[];
}

// export interface ICartItemModel {
//   _id: string;
//   title: string;
//   price: number;
// }

export interface ICartItemModel {
  item: string;
  quantity: number;
}
export interface ICartModel {
  items: ICartItemModel[];
}

export interface ICartDocument extends ICartModel {
  createdAt: any;
  _id: string;
}

export interface IShippingModel {
  title: string;
  price: number;
}
export interface IShippingDocument extends IShippingModel {
  _id: string;
}

interface IAddressModel {
  country: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
}

export type IOrderStatus =
  | "pending"
  | "awaiting_payment"
  | "payment_failed"
  | "paid"
  | "fulfilled"
  | "shipped"
  | "partially_shipped"
  | "completed"
  | "cancelled"
  | "declined"
  | "refunded"
  | "partially_refunded"
  | "disputed"
  | "manual_verification_required";

export interface IOrderModel {
  user?: string;
  cart: ICartDocument | string;
  itemsTotal: number;
  shipping?: IShippingModel;
  address?: IAddressModel;
  total: number;
  status: IOrderStatus;
}

export interface IOrderDocument extends IOrderModel {
  _id: string;
}
