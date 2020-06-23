import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Brand } from "../entity";

export async function brandDeleteOneAction(
  request: Request,
  response: Response
) {
  const repo = getManager().getRepository(Brand);
  const results = await repo.delete({
    id: parseInt(request.query.id as string),
  });
  return response.send(results);
}
