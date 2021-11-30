import { Request, Response } from "express";
import { buildTokens, clearTokens, setTokens } from "@libs/jwt";
import userService from "@services/user-service";

async function createUser(req: Request, res: Response) {
  const user = await userService.createUser(req.body);

  const { accessToken, refreshToken } = buildTokens(user);

  setTokens(res, accessToken, refreshToken);

  return res.status(200).json({ success: true, message: "User created successfully." });
}

async function getCurrentUser(_req: Request, res: Response) {
  const session = res.locals.token;

  const user = await userService.getUser(
    { _id: session.userId },
    { pick: ["firstName", "lastName", "email"] }
  );

  return res.status(200).json({ success: true, message: "User fetched successfully.", user });
}

async function deleteCurrentUser(_req: Request, res: Response) {
  const session = res.locals.token;

  await userService.deleteUser({ _id: session.userId });

  clearTokens(res);

  return res.status(200).json({ success: true, message: "User deleted successfully." });
}

async function updateCurrentUser(req: Request, res: Response) {
  const session = res.locals.token;

  await userService.updateUser({ _id: session.userId }, req.body);

  return res.status(200).json({ success: true, message: "User updated." });
}

//
export default Object.freeze({
  createUser,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
});
