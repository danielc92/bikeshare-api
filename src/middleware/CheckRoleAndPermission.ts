import { NextFunction, Response, Request } from "express";
import { getManager } from "typeorm";
import { RoleEnum, Role } from "../entity/Role";
import { API_MESSAGES } from "~/utils/messages";

export async function roleAndPermissionMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const role = !request.user ? RoleEnum.ANON : request.user.role;

    const repo = getManager().getRepository(Role);

    const result = await repo.findOne({
      where: {
        role,
      },
      relations: ["permissions"],
    });

    const allowedToAccess = result.permissions.some(
      (p) =>
        p.requestMethod.toLowerCase() === request.method.toLowerCase() &&
        p.apiRoute.toLowerCase() === request.path.toLowerCase()
    );

    if (!allowedToAccess)
      return response.status(400).json({ message: API_MESSAGES.NO_PERMISSION });

    next();
  } catch (error) {
    console.error(error);
    return response.status(400).json({ message: API_MESSAGES.NO_PERMISSION });
  }
}
