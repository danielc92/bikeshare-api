import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Rider } from "../../entity";

export async function riderGetAllAction(request: Request, response: Response) {
  const repo = getManager().getRepository(Rider);
  const results = await repo.find({ loadRelationIds: true });
  return response.status(200).json({
    results,
  });
}
