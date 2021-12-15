export const environment = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT!,
  isProduction: process.env.NEXT_PUBLIC_ENVIRONMENT! === "production",
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,

  baseDomain: process.env.BASE_DOMAIN!,
};
