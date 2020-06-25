import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Pack } from "../../entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export async function packUpdateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { id, packMotto, packName } = request.body;
    if (!id) return response.status(400).json({ message: "Missing id." });

    const repo = getManager().getRepository(Pack);

    let partial: QueryDeepPartialEntity<Pack> = {};
    if (packMotto) partial.packMotto = packMotto;
    if (packName) partial.packName = packName;

    const results = await repo.update(id as string, partial);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
