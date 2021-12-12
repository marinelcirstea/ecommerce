import { Request, Response, NextFunction } from "express";

interface ICallback {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const catchException = (fn: ICallback) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default catchException;
