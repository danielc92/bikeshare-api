import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { API_MESSAGES } from "~/utils/messages";

export interface IDecodedRider {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export async function authMiddlewareFunc(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.headers["token"];
    if (!token) {
      return response.status(400).json({ message: API_MESSAGES.MISSING_TOKEN });
    }

    const decoded = await jwt.verify(token as string, "secret");
    if (!decoded)
      return response.status(400).json({ message: API_MESSAGES.INVALID_TOKEN });
    request.user = decoded as IDecodedRider;
    next();
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
