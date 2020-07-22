import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Bike } from "../../entity";
import { client } from "../../redis_client";

export async function bikeGetAllAction(request: Request, response: Response) {
  try {
    client.get("allBikes", async (error, reply) => {
      if (!reply) {
        const repo = getManager().getRepository(Bike);
        const results = await repo.find();
        const resultsString = JSON.stringify(results);
        client.setex("allBikes", 10000, resultsString, (setError, setReply) => {
          return response.status(200).json({
            results,
          });
        });
      } else {
        return response.status(200).json({
          results: reply,
        });
      }
    });

    // const repo = getManager().getRepository(Bike);
    // const results = await repo.find();
    // return response.status(200).json({
    //   results,
    // });
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
