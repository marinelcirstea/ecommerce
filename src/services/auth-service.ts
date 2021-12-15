import { Response } from "express";
import CustomError from "@libs/custom-error";
import { buildTokens, clearTokens, refreshTokens, setTokens, verifyRefreshToken } from "@libs/jwt";
import { compare } from "@libs/string-utils/hash-and-compare";
import { isEmail, isString } from "@libs/string-utils";
import User from "@models/user-model";

export interface IReqBody {
  [key: string]: any;
}

const loginWithEmailAndPassword = async (reqBody: IReqBody, res: Response) => {
  const invalid = new CustomError("Invalid credentials.", 400);
  const { email, password } = reqBody;

  if (!isString(password) || !isString(email) || !isEmail(email)) {
    throw invalid;
  }

  const user = await User.findOne({ email });
  if (!user) throw invalid;

  const isMatch = await compare(password, user.password);
  if (!isMatch) throw invalid;

  const { accessToken, refreshToken } = buildTokens(user);

  setTokens(res, accessToken, refreshToken);
};

const logoutUser = (res: Response) => {
  clearTokens(res);
};

const refresh = async (refreshTokenFromReq: string, res: Response) => {
  try {
    const current = verifyRefreshToken(refreshTokenFromReq);

    const user = await User.findOne({ _id: current.userId });
    if (!user) throw "User not found";

    const { accessToken, refreshToken } = refreshTokens(current, user.tokenVersion);
    setTokens(res, accessToken, refreshToken);
  } catch (error) {
    clearTokens(res);
  }
};

export async function increaseTokenVersion(userId: string) {
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { $inc: { tokenVersion: 1 } },
    { upsert: false, new: true }
  ).lean();
  if (!result) {
    throw new Error("Failed to increment token version.");
  }
  return result;
}

export default {
  refresh,
  loginWithEmailAndPassword,
  logoutUser,
};
