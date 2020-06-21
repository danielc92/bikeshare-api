import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../entity";

export async function bikeDeleteOneAction(
  request: Request,
  response: Response
) {
  const repo = getManager().getRepository(Bike);
  const results = await repo.delete({
    id: parseInt(request.query.id as string),
  });
  return response.send(results);
}
