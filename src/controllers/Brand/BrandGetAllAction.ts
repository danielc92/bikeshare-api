import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Brand } from "../../entity";

export async function brandGetAllAction(request: Request, response: Response) {
  const repo = getManager().getRepository(Brand);
  const results = await repo.find();
  return response.status(200).json({
    results,
  });
}
