import "reflect-metadata";
import { createConnection } from "typeorm";
import { Bike } from "./entity/Bike";

createConnection()
  .then(async (connection) => {
    console.log("Inserting a new user into the database...");
    let bike1 = new Bike();
    bike1.colour = "BLUE";
    bike1.gender = "MALE";
    bike1.isAvailable = false;
    bike1.modelCode = "BNF0903";

    await connection.manager.save(bike1);
    console.log("bike has been saved.");
  })
  .catch((error) => console.log(error));
