import { NextFunction, Response, Request } from "express";
import { getManager } from "typeorm";
import { Role } from "../entity";
import { RoleEnum } from "../entity/Role";
export async function roleAndPermissionMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const role = !request.user ? RoleEnum.ANON : request.user.role;

    const repo = getManager().getRepository(Role);
    const result = await repo.findOne({
      where: { role },
      relations: ["permissions"],
    });

    const allowedToAccess = result.permissions.some(
      (p) =>
        p.requestMethod.toLowerCase() === request.method.toLowerCase() &&
        p.apiRoute.toLowerCase() === request.path.toLowerCase()
    );

    if (!allowedToAccess)
      return response
        .status(400)
        .json({ message: "No permission to resource" });

    next();
  } catch (error) {
    return response
      .status(400)
      .json({ message: error.toString(), failedAt: "Roles and permissions." });
  }
}
