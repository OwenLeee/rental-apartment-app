import { Request, Response, NextFunction } from "express";

export const asyncWrapper = (fn: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
	Promise.resolve(fn(req, res, next)).catch((err) => {
		console.log(err);
		res.status(500).json({ message: "Internal Error" });
	})
};
