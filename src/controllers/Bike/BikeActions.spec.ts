import { app } from "../../app";
import { ApiRouteEnum } from "../../entity/Permission";
import * as supertest from "supertest";
import { createConnection, getConnection } from "typeorm";
import { connection } from "../../utils/connection";

describe("Bike tests", async () => {
  //   beforeAll(async () => {
  //     await connection.create();
  //   });

  //   afterAll(async () => {
  //     await connection.close();
  //   });

  //   beforeEach(async () => {
  //     await connection.clear();
  //   });

  it("Unauthenticated user can access bike list successfully", async () => {
    createConnection()
      .then(async (connection) => {
        const superapp = supertest(app);
        const result = await superapp.get(ApiRouteEnum.BIKE);
        return expect(result.status).toEqual(200);
      })
      .catch((error) => console.log(error));
  });
});
