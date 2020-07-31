import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Rider } from "../../entity";
import { API_MESSAGES } from "~/utils/messages";

export async function myRoutesGetOneAction(
  request: Request,
  response: Response
) {
  try {
    const repo = getManager().getRepository(Rider);
    const results = await repo.findOne(request.user.id, {
      relations: ["routes"],
    });
    if (!results) {
      return response.status(404).json({ message: API_MESSAGES.NOT_FOUND });
    }
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
