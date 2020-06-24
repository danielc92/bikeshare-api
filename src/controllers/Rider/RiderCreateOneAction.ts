import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Rider } from "../../entity";
import * as bcrypt from "bcrypt";
export async function riderCreateOneAction(
  request: Request,
  response: Response
) {
  try {
    const { city, firstName, lastName, phone, password, email } = request.body;

    const newRecord = new Rider();
    newRecord.city = city;
    newRecord.firstName = firstName;
    newRecord.lastName = lastName;
    newRecord.phone = phone;
    const hashedPassword = await bcrypt.hash(password, 10);
    newRecord.password = hashedPassword;
    newRecord.email = email;

    const results = await getManager().save(newRecord);
    return response.send(results);
  } catch (error) {
    return response.status(400).json({ error: error.toString() });
  }
}