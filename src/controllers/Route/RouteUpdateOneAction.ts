import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Route } from "../../entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export async function routeUpdateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { id, area, difficulty, totalDistance } = request.body;
    if (!id) return response.status(400).json({ message: "Missing id." });

    const repo = getManager().getRepository(Route);

    let partial: QueryDeepPartialEntity<Route> = {};
    if (area) partial.area = area;
    if (difficulty) partial.difficulty = difficulty;
    if (totalDistance) partial.totalDistance = totalDistance;

    const results = await repo.update(id as string, partial);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
