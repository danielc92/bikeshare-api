import { app } from "../../app";
import { ApiRouteEnum } from "../../entity/Permission";
import * as request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { connection } from "../../utils/connection";

describe("all of em", () => {
  beforeAll(async (done) => {
    console.log("BEFORE ALL");
    await createConnection();
    done();
  });

  afterAll(async (done) => {
    console.log("AFTER ALL");
    await getConnection().close();
  });

  test("Unauthenticated user bike list", async () => {
    console.log("TESTING ALL");
    const response = await request(app).get("/bike");
    expect(response.status).toEqual(200);
  });
});

// describe("Bike tests", () => {
//   beforeAll(async () => {
//     await connection.create();
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   beforeEach(async () => {
//     await connection.clear();
//   });

//   it("Unauthenticated user can access bike list successfully", async () => {
//     await createConnection();
//     const superapp = supertest(app);
//     const result = await superapp.get(ApiRouteEnum.BIKE);
//     expect(result.status).toEqual(200);
//   });
// });
