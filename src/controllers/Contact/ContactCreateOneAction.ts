import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Contact } from "../../entity";

export async function contactCreateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { enquiryContent, enquiryType } = request.body;

    const newRecord = new Contact();
    newRecord.enquiryContent = enquiryContent;
    newRecord.enquiryType = enquiryType;

    const results = await getManager().save(newRecord);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ error: error.toString() });
  }
}
