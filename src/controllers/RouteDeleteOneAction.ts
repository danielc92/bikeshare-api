import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike, Route } from "../entity";

export async function routeDeleteOneAction(
  request: Request,
  response: Response
) {
  const repo = getManager().getRepository(Route);
  const results = await repo.delete({
    id: parseInt(request.query.id as string),
  });
  return response.send(results);
}
