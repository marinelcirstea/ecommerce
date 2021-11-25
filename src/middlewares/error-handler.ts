import { Request, Response, NextFunction } from "express";
export default (e: any, _req: Request, res: Response, _next: NextFunction) => {
  // if (e.name === "MongoServerError") {
  //   switch(e.code){

  //   }
  // }
  if (!e.statusCode) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Something went wrong on our side." });
  }

  return res.status(e.statusCode).json({ success: false, message: e.message });
};
