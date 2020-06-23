import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike, Route, Brand } from "../entity";

export async function brandGetOneAction(request: Request, response: Response) {
  const { id } = request.query;
  if (!id) return response.status(400).json({ message: "Missing id." });
  const repo = getManager().getRepository(Brand);
  const results = await repo.findOne(id as string);
  if (!results) {
    return response.status(404).json({ message: "Resource not found." });
  }
  return response.send(results);
}
