import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Brand } from "../../entity";

export async function brandGetAllAction(request: Request, response: Response) {
  try {
    const repo = getManager().getRepository(Brand);
    const results = await repo.find();
    return response.status(200).json({
      results,
    });
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
