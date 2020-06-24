import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Brand } from "../../entity";

export async function brandDeleteOneAction(
  request: Request,
  response: Response
) {
  try {
    const repo = getManager().getRepository(Brand);
    const results = await repo.delete({
      id: parseInt(request.query.id as string),
    });
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
