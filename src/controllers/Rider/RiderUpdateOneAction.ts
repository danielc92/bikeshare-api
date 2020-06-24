import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike, Route, Brand, Rider } from "../../entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export async function riderUpdateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { id, city, phone, firstName, lastName } = request.body;
    if (!id) return response.status(400).json({ message: "Missing id." });

    const repo = getManager().getRepository(Rider);

    let partial: QueryDeepPartialEntity<Rider> = {};
    if (city) partial.city = city;
    if (phone) partial.phone = phone;
    if (firstName) partial.firstName = firstName;
    if (lastName) partial.lastName = lastName;

    const results = await repo.update(id as string, partial);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
