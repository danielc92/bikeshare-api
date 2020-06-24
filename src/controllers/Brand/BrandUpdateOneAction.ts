import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike, Route, Brand } from "../../entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export async function brandUpdateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { id, title } = request.body;
    if (!id) return response.status(400).json({ message: "Missing id." });

    const repo = getManager().getRepository(Brand);

    let partial: QueryDeepPartialEntity<Brand> = {};
    if (title) partial.title = title;

    const results = await repo.update(id as string, partial);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
