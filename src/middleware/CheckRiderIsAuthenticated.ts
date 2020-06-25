import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { RoleEnum } from "entity/Role";

export interface IDecodedRider {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleEnum;
}

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
    if (!decoded)
      return response.status(400).json({ message: "Failed verification" });
    request.user = decoded as IDecodedRider;
    next();
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
