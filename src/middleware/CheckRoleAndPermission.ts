import { NextFunction, Response, Request } from "express";
import { getManager } from "typeorm";
import { Role } from "../entity";
export async function roleAndPermissionMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log(request.user, "Roles");

    const repo = getManager().getRepository(Role);

    // const roleExist = await repo.find({ role: request });

    next();
  } catch (error) {
    return response
      .status(400)
      .json({ message: error.toString(), failedAt: "Roles and permissions." });
  }
}
