import { Request, Response } from "express";
import CustomError from "../../libs/errors/custom-error";
import { clearTokens } from "../../libs/jwt";
import User from "../../models/User";

const logoutUser = async (_req: Request, res: Response) => {
  const session = res.locals.token; // guaranteed to exist if passed auth middleware

  const user = await User.findOne({ _id: session.userId });
  if (!user) {
    throw new CustomError("There's been a problem logging out.", 400);
  }

  clearTokens(res);

  return res.status(200).json({ success: true, message: "Logout successful." });
};

export default logoutUser;
