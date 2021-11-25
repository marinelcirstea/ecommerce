import getUsers from "./get-users";
import getCurrentUser from "./get-current-user";
import createUser from "./create-user";
import updateUserById from "./update-user";
import deleteUserById from "./delete-user";
import loginUser from "./login-user";
import logoutUser from "./logout-user";

export const userController = Object.freeze({
  getUsers,
  getCurrentUser,
  createUser,
  updateUserById,
  deleteUserById,
  loginUser,
  logoutUser,
});
