export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "";
export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
export const MONGODB_URI = process.env.MONGODB_URI || "";
