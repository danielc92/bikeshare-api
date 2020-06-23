import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../entity";

export async function bikeGetOneAction(request: Request, response: Response) {
  const { id } = request.query;
  if (!id) return response.status(400).json({ message: "Missing id." });
  const repo = getManager().getRepository(Bike);
  const results = await repo.findOne(id as string, { relations: ["brand"] });
  if (!results) {
    return response.status(404).json({ message: "Resource not found." });
  }
  return response.send(results);
}
