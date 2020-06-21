import { NextFunction, Response, Request } from "express";

export async function authMiddlewareFunc(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    parseFloat("dasdsad");
    request.user = {
      email: "Daniel@Smith.com",
      name: "Daniel Smith",
      age: 120,
    };
    next();
  } catch (e) {
    response.status(400).json({ error: "Auth error." });
  }
}
