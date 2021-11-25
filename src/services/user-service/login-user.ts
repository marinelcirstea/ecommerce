import { Request, Response } from "express";
import { buildTokens, setTokens } from "../../libs/jwt";
import { compare } from "../../libs/password-utils";
import { isEmail } from "../../libs/validator/isEmail";
import { isString } from "../../libs/validator/isString";
import CustomError from "../../libs/errors/custom-error";
import User from "../../models/User";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const invalid = new CustomError("Invalid credentials.", 400);
  if (!isString(password) || !isString(email) || !isEmail(email)) {
    throw invalid;
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw invalid;
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw invalid;
  }

  const { accessToken, refreshToken } = buildTokens(user);

  setTokens(res, accessToken, refreshToken);

  return res.status(200).json({ success: true, message: "Login successful." });
};

export default loginUser;
