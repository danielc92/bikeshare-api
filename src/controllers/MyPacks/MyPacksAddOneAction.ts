import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Rider, Pack } from "../../entity";

export async function myPacksAddOneAction(
  request: Request,
  response: Response
) {
  try {
    const { packId } = request.body;
    const packRepo = getManager().getRepository(Pack);
    const pack = await packRepo.findOne(packId);
    if (!pack) return response.status(400).json({ message: "Pack not found" });

    const riderRepo = getManager().getRepository(Rider);
    const rider = await riderRepo.findOne(request.user.id);
    if (!rider)
      return response.status(400).json({ message: "Rider not found" });

    rider.packs = [...rider.packs, pack];
    await getManager().save(rider);
    return response.send(rider);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
