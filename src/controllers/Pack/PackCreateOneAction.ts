import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Pack, Rider } from "../../entity";

export async function packCreateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { packMotto, packName } = request.body;

    const newRecord = new Pack();
    newRecord.packMotto = packMotto;
    newRecord.packName = packName;

    const rider = await getManager()
      .getRepository(Rider)
      .findOne(request.user.id);
    newRecord.rider = rider;

    const results = await getManager().save(newRecord);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
