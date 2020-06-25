import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Rider } from "../../entity";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
export async function loginAction(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    const repo = getManager().getRepository(Rider);

    const rider = await repo.findOne({
      where: {
        email,
      },
      relations: ["role"],
    });
    const hashedPassword = await bcrypt.compare(password, rider.password);
    if (!hashedPassword)
      return response.status(400).json({ message: "Incorrect credentials" });

    const token = await jwt.sign(
      {
        id: rider.id,
        email: rider.email,
        firstName: rider.firstName,
        lastName: rider.lastName,
        role: rider.role.role,
      },
      "secret",
      {
        expiresIn: 3600,
      }
    );
    return response.status(200).json({
      token,
    });
  } catch (error) {
    return response.status(400).json({ message: error.toString() });
  }
}
