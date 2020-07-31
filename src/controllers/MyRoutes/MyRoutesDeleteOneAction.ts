import { Request, Response } from "express";
import { getManager, createQueryBuilder } from "typeorm";
import { Rider, Route } from "../../entity";
import { API_MESSAGES } from "~/utils/messages";

export async function myRoutesDeleteOneAction(
  request: Request,
  response: Response
) {
  try {
    const { routeId } = request.body;
    const routeRepo = getManager().getRepository(Route);
    const route = await routeRepo.findOne(routeId);
    if (!route)
      return response.status(400).json({ message: API_MESSAGES.NOT_FOUND });

    const riderRepo = getManager().getRepository(Rider);
    const rider = await riderRepo.findOne(request.user.id);
    if (!rider)
      return response.status(400).json({ message: API_MESSAGES.NOT_FOUND });

    await createQueryBuilder()
      .relation(Rider, "routes")
      .of(rider)
      .remove(route);
    return response.status(200).json({ removed: route });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: error.toString() });
  }
}
