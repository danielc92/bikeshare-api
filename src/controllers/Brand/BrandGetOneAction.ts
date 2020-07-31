import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Brand } from "../../entity";
import { API_MESSAGES } from "~/utils/messages";

export async function brandGetOneAction(request: Request, response: Response) {
  try {
    const { id } = request.query;
    if (!id)
      return response.status(400).json({ message: API_MESSAGES.MISSING_ID });
    const repo = getManager().getRepository(Brand);
    const results = await repo.findOne(id as string);
    if (!results) {
      return response.status(404).json({ message: API_MESSAGES.NOT_FOUND });
    }
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
