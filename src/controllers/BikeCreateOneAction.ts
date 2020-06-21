import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../entity";

export async function bikeCreateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { colour, gender, modelCode, isAvailable } = request.body;
    const bike = new Bike();
    bike.colour = colour;
    bike.isAvailable = isAvailable;
    bike.modelCode = modelCode;
    bike.gender = gender;
    const results = await getManager().save(bike);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ error: error.name });
  }
}
