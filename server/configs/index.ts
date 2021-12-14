import criticalConfig from "./critical-config";
import userConfig from "./user-config";
import productConfig from "./product-configs";
import categoryConfig from "./category-configs";

interface IGlobalConfig {
  [key: string]: any;
}

const globalConfig: IGlobalConfig = Object.freeze({
  ...criticalConfig,
  ...userConfig,
  ...productConfig,
  ...categoryConfig,
});

export default globalConfig;
