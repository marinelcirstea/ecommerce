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
  // categories: IProductModelCategoryStructure[];
  // thumbnail?: string;
  // images?: IProductModelImageStructure[];
}
export interface IProductDocument extends IProductModel {
  _id: string;
}

export interface IFilterOptions {
  exclude?: string[];
  pick?: string[];
}
