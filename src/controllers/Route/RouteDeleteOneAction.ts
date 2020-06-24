import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Route } from "../../entity";

export async function routeDeleteOneAction(
  request: Request,
  response: Response
) {
  try {
    const repo = getManager().getRepository(Route);
    const results = await repo.delete({
      id: parseInt(request.query.id as string),
    });
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
