import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  const { userId, email } = req.query;
};
