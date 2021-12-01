const criticalConfig = Object.freeze({
  IS_PRODUCTION: process.env.NODE_ENV! === "production",
  ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET!,
  MONGODB_URI: process.env.MONGODB_URI!,
});

export default criticalConfig;
