import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../entity";

export async function bikeGetAllAction(request: Request, response: Response) {
  const repo = getManager().getRepository(Bike);
  const results = await repo.find();
  console.log(request.user);
  response.status(200).json({
    results,
  });
}
