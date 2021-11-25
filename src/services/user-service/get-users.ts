// import { Request, Response } from "express";
// import CustomError from "../../libs/errors/custom-error";
// import User from "../../models/User";
const getUsers = () => {};
// const getUsers = async (_req: Request, res: Response) => {
//   const session = res.locals.token;
//   // [TODO:1000]: implement limits and offsets when fetching users
//   // const {limit, offset} = req.query

//   const user = await User.findOne({ _id: session.userId });
//   if (!user) {
//     throw new CustomError("Something happened. Try again later.", 400);
//   }
//   return res.status(200).json({ success: true, message: "", user });
//   /**
//  [TODO:1001]: Add param isPlatformEmployee and employee role based authorization

//  if not platform employee and authorized to view users,
//   return the current user(the person making the request)

//  if(!user.isPlatformEmployee){
//     return res.status(200).json({success:true, message:"", user})
//   }

//   if(!user.isPlatformEmployee && user.platformEmployeeRights.viewUsers){

//   }

//   */
// };

export default getUsers;
