import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

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
    next();
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
