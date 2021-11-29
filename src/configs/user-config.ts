export interface IUserConfig {
  FIRST_NAME_MIN: number;
  FIRST_NAME_MAX: number;
  LAST_NAME_MIN: number;
  LAST_NAME_MAX: number;
  PASSWORD_MIN: number;
  PASSWORD_MAX: number;
  PASSWORD_SALT: number | string;
}
const userConfig: IUserConfig = Object.freeze({
  FIRST_NAME_MIN: 2,
  FIRST_NAME_MAX: 30,
  LAST_NAME_MIN: 2,
  LAST_NAME_MAX: 30,
  PASSWORD_MIN: 6,
  PASSWORD_MAX: 60,
  PASSWORD_SALT: 10,
});

export default userConfig;
