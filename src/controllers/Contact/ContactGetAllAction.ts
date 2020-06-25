import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Contact } from "../../entity";

export async function contactGetAllAction(
  request: Request,
  response: Response
) {
  const repo = getManager().getRepository(Contact);
  const results = await repo.find();
  return response.status(200).json({
    results,
  });
}
