import "reflect-metadata";
import { createConnection, ConnectionManager, getRepository } from "typeorm";
import { Brand, Bike, Feedback, Route, Rider, Contact, Pack } from "./entity";
import * as express from "express";
import * as faker from "faker";
import { connect } from "net";
import { EnumForEnquiry } from "./entity/Contact";

createConnection()
  .then(async (connection) => {
    // let r = new Rider();
    // r.city = "sunshine";
    // r.firstName = "george";
    // r.lastName = "smith";
    // r.phone = "04 0000 0000";

    // let packs = connection.getRepository(Pack);
    // let results = await packs.find();

    // r.packs = results;
    // await connection.manager.save(r);

    let x = await connection
      .getRepository(Rider)
      .findOne({ where: { id: 3 }, relations: ["packs"] });
    console.log(x);

    x.packs = x.packs.filter((p) => p.id !== 3);
    await connection.manager.save(x);

    // const data = await connection
    //   .getRepository(Pack)
    //   .find({ relations: ["riders"], loadRelationIds: true });
    // const data = await connection
    //   .getRepository(Pack)
    //   .createQueryBuilder("pack")
    //   .leftJoinAndSelect("pack.riders", "rider")
    //   .getMany();
    // console.log(data);
    // let p = new Pack();
    // p.rider = r;
    // p.packName = "Daniels Cool Pack";

    // let p2 = new Pack();

    // p2.rider = r;
    // p2.packName = "Daniels Old People Pack";

    // await connection.manager.save(r);
    // await connection.manager.save(p);
    // await connection.manager.save(p2);
    // a.forEach((x) => {
    //   let z = new Feedback();
    //   z.content = faker.random.words(2);
    //   connection.manager
    //     .save(z)
    //     .then((s) => console.log("Success"))
    //     .catch((e) => console.log(e));
    // });

    // connection.manager
    //   .getRepository(Contact)
    //   .find()
    //   .then((r) => console.log(r));

    // console.log(EnumForEnquiry['C'])

    // const app = express();
    // app.get(
    //   "/",
    //   (
    //     request: express.Request,
    //     response: express.Response,
    //     next: express.NextFunction
    //   ) => {
    //     const repo = connection.manager.getRepository(Feedback);
    //     repo
    //       .find({ take: 10 })
    //       .then((data) => response.status(200).json({ data }))
    //       .catch((error) => response.status(404).json({ error }));
    //   }
    // );
    // app.listen(3010);
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
