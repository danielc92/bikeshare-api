import "reflect-metadata";
import { createConnection } from "typeorm";
import { Brand, Bike, Feedback, Route, Rider } from "./entity";
import * as express from "express";
import * as faker from "faker";

createConnection()
  .then(async (connection) => {
    // a.forEach((x) => {
    //   let z = new Feedback();
    //   z.content = faker.random.words(2);
    //   connection.manager
    //     .save(z)
    //     .then((s) => console.log("Success"))
    //     .catch((e) => console.log(e));
    // });
    const app = express();
    app.get(
      "/",
      (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
      ) => {
        const repo = connection.manager.getRepository(Feedback);
        repo
          .find({ take: 10 })
          .then((data) => response.status(200).json({ data }))
          .catch((error) => response.status(404).json({ error }));
      }
    );
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
