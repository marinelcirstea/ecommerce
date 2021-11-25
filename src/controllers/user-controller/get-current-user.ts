import { Request, Response } from "express";
import User from "../../models/User";

const getCurrentUser = async (_req: Request, res: Response) => {
  const session = res.locals.token;

  const user = await User.findOne(
    { _id: session.userId },
    "-password -_id -__v -createdAt -updatedAt"
  );

  if (!user) {
    throw new Error("");
  }

  return res.status(200).json({ success: true, message: "User fetched successfully.", user });
};

export default getCurrentUser;
