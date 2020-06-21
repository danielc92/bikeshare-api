import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../entity";

export async function bikeDeleteOneAction(
  request: Request,
  response: Response
) {
  const repo = getManager().getRepository(Bike);
  //@ts-ignore
  const results = await repo.delete({ id: request.body.id });
  return response.send(results);
}
