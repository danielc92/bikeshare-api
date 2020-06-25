import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Pack } from "../../entity";

export async function packDeleteOneAction(
  request: Request,
  response: Response
) {
  try {
    const repo = getManager().getRepository(Pack);
    const results = await repo.delete({
      id: parseInt(request.query.id as string),
    });
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
