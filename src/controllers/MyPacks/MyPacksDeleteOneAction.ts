import { Request, Response } from "express";
import { getManager, createQueryBuilder } from "typeorm";
import { Rider, Pack } from "../../entity";
import { API_MESSAGES } from "~/utils/messages";

export async function myPacksDeleteOneAction(
  request: Request,
  response: Response
) {
  try {
    const { packId } = request.body;
    const packRepo = getManager().getRepository(Pack);
    const pack = await packRepo.findOne(packId);
    if (!pack)
      return response.status(400).json({ message: API_MESSAGES.NOT_FOUND });

    const riderRepo = getManager().getRepository(Rider);
    const rider = await riderRepo.findOne(request.user.id);
    if (!rider)
      return response.status(400).json({ message: API_MESSAGES.NOT_FOUND });

    await createQueryBuilder().relation(Rider, "packs").of(rider).remove(pack);
    return response.status(200).json({ removed: pack });
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
