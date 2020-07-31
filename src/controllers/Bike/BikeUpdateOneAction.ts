import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../../entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { API_MESSAGES } from "~/utils/messages";

export async function bikeUpdateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { id, colour, isAvailable, brand, modelCode, gender } = request.body;
    if (!id)
      return response.status(400).json({ message: API_MESSAGES.MISSING_ID });

    const repo = getManager().getRepository(Bike);

    let partial: QueryDeepPartialEntity<Bike> = {};
    if (colour) partial.colour = colour;
    if (brand) partial.brand = brand;
    if (isAvailable) partial.isAvailable = isAvailable;
    if (modelCode) partial.modelCode = modelCode;
    if (gender) partial.gender = gender;

    const results = await repo.update(id as string, partial);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
