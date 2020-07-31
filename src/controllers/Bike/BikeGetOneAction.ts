import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../../entity";
import { API_MESSAGES } from "~/utils/messages";

export async function bikeGetOneAction(request: Request, response: Response) {
  try {
    const { id } = request.query;
    if (!id)
      return response.status(400).json({ message: API_MESSAGES.MISSING_ID });
    const repo = getManager().getRepository(Bike);
    const results = await repo.findOne(id as string);
    if (!results) {
      return response.status(404).json({ message: API_MESSAGES.NOT_FOUND });
    }
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
