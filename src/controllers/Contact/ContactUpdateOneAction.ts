import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Contact } from "../../entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { API_MESSAGES } from "~/utils/messages";

export async function contactUpdateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { id, enquiryContent, enquiryType } = request.body;
    if (!id)
      return response.status(400).json({ message: API_MESSAGES.MISSING_ID });

    const repo = getManager().getRepository(Contact);

    let partial: QueryDeepPartialEntity<Contact> = {};
    if (enquiryContent) partial.enquiryContent = enquiryContent;
    if (enquiryType) partial.enquiryType = enquiryType;

    const results = await repo.update(id as string, partial);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
