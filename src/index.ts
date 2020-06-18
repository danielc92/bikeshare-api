import "reflect-metadata";
import { createConnection } from "typeorm";
import { Brand, Bike, Route, Rider } from "./entity";
import * as express from "express";

createConnection()
  .then(async (connection) => {
    const repo = connection.getRepository(Bike);
    const app = express();
    app.get("/", (request, response, next) => {
      repo
        .find()
        .then((r) => response.status(200).json({ r }))
        .catch((e) => response.status(404).json({ failure: "." }));
    });
    app.listen(3010);
  })
  .catch((error) => console.log(error));

// let r1 = new Route();
// let r2 = new Route();

// r1.area = "Melbourne";
// r1.difficulty = "Easy";
// r1.totalDistance = 5000;

// r2.area = "Melbourne";
// r2.difficulty = "Medium";
// r2.totalDistance = 16500;

// await connection.manager.save(r1);
// await connection.manager.save(r2);

// Inserting many to many
// let z = connection.getRepository(Route);
// let results = await z.find();
// let x = connection.getRepository(Rider);
// let rider = await x.findOne();
// console.log(rider);
// rider.routes = results;
// await connection.manager.save(rider);
