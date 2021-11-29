import criticalConfig from "./critical-config";
import userConfig from "./user-config";

interface IGlobalConfig {
  [key: string]: any;
}

const globalConfig: IGlobalConfig = Object.freeze({ ...criticalConfig, ...userConfig });

export default globalConfig;
