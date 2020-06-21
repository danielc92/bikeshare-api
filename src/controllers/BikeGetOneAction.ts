import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../entity";

export async function bikeGetOneAction(request: Request, response: Response) {
  const repo = getManager().getRepository(Bike);
  //@ts-ignore
  const results = await repo.findOne({ id: request.query.id });
  if (!results) {
    return response.status(404).json({ message: "Resource not found." });
  }

  return response.send(results);
}
