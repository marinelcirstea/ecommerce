import { validator } from "../../../libs/validator";
import { hash } from "../../../libs/password-utils";
import * as GlobalConfig from "../../../configs";
import { buildMakeUser, IMakeUser } from "./build-make-user";

export const makeUser: IMakeUser = buildMakeUser(GlobalConfig, hash, validator);
