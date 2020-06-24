import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Contact } from "entity";

export async function contactGetOneAction(
  request: Request,
  response: Response
) {
  try {
    const { id } = request.query;
    if (!id) return response.status(400).json({ message: "Missing id." });
    const repo = getManager().getRepository(Contact);
    const results = await repo.findOne(id as string);
    if (!results) {
      return response.status(404).json({ message: "Resource not found." });
    }
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
