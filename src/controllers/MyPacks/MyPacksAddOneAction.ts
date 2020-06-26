import { Request, Response } from "express";
import { getManager, createQueryBuilder } from "typeorm";
import { Rider, Pack } from "../../entity";

export async function myPacksAddOneAction(
  request: Request,
  response: Response
) {
  try {
    const { packId } = request.body;
    const packRepo = getManager().getRepository(Pack);
    const pack = await packRepo.findOne(packId);
    if (!pack)
      return response.status(400).json({ message: "Resource not found" });

    const riderRepo = getManager().getRepository(Rider);
    const rider = await riderRepo.findOne(request.user.id);
    if (!rider)
      return response.status(400).json({ message: "Resource not found" });

    await createQueryBuilder().relation(Rider, "packs").of(rider).add(pack);

    return response.status(200).json({ added: pack });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: error.toString() });
  }
}
