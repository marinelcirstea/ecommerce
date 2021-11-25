import getUsers from "./get-users";
import getCurrentUser from "./get-current-user";
import createUser from "./create-user";
import updateUserById from "./update-user";
import deleteUserById from "./delete-user";
import loginUser from "./login-user";
import logoutUser from "./logout-user";

const userService = Object.freeze({
  // getUsers
  getUsers,
  // getCurrentUser
  getCurrentUser,
  // createUser
  createUser,
  // updateUser
  updateUserById,
  // deleteUser
  deleteUserById,
  // login
  loginUser,
  // logout
  logoutUser,
});

export default userService;
