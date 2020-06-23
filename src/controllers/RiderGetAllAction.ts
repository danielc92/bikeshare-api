import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike, Rider } from "../entity";

export async function riderGetAllAction(request: Request, response: Response) {
  const repo = getManager().getRepository(Rider);
  const results = await repo.find();
  return response.status(200).json({
    results,
  });
}
