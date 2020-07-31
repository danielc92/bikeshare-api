import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Brand } from "../../entity";

export async function brandCreateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { title } = request.body;

    const newRecord = new Brand();
    newRecord.title = title;

    const results = await getManager().save(newRecord);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
