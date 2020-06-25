import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Rider } from "../../entity";

export async function riderGetAllAction(request: Request, response: Response) {
  try {
    const repo = getManager().getRepository(Rider);
    const results = await repo.find({ loadRelationIds: true });
    return response.status(200).json({
      results,
    });
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
