import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

interface IDecodedRider {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
jwt.TokenExpiredError;
export async function authMiddlewareFunc(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.headers["token"];
    if (!token) {
      return response.status(400).json({ message: "Missing auth token" });
    }

    const decoded = await jwt.verify(token as string, "secret");
    request.user = decoded as IDecodedRider;
    next();
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
