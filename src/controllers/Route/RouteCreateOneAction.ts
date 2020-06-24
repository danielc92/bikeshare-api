import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Route } from "../../entity";

export async function routeCreateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { area, difficulty, totalDistance } = request.body;

    const newRecord = new Route();
    newRecord.area = area;
    newRecord.difficulty = difficulty;
    newRecord.totalDistance = totalDistance;

    const results = await getManager().save(newRecord);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ error: error.toString() });
  }
}
