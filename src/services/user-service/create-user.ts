import { makeUser } from "./factory";
import { Request, Response } from "express";
import { buildTokens, setTokens } from "../../libs/jwt";
import User from "../../models/User";
import CustomError from "../../libs/errors/custom-error";

const createUser = async (req: Request, res: Response) => {
  const validUser = await makeUser(req.body);
  const exists = await User.findOne({ email: validUser.email });

  if (exists) {
    throw new CustomError("This email is already in use, try to log in instead.", 400);
  }

  const newUser = new User(validUser);
  await newUser.save();

  const { accessToken, refreshToken } = buildTokens(newUser);

  setTokens(res, accessToken, refreshToken);

  return res.status(200).json({ success: true, message: "User created successfully." });
};

export default createUser;
