import { connection } from "~/utils/connection";
import * as supertest from "supertest";
import { app } from "~/app";
import { ApiRouteEnum } from "~/entity/Permission";

describe("Contact Test Suite", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.prepopulate();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  test("Unauthenticated user can create contact data", async (done) => {
    const response = await supertest(app).post(ApiRouteEnum.CONTACT).send({
      enquiryType: "Complaint",
      enquiryContent: "You would not believe what happened today...",
      email: "MrJoe@complaint.com",
    });
    expect(response.status).toBe(200);
    done();
  });

  test("Unauthenticated user can get contacts data", async (done) => {
    await supertest(app).get(ApiRouteEnum.CONTACT).expect(200);
    done();
  });

  test("Unauthenticated user can get contacts details data", async (done) => {
    await supertest(app)
      .get(ApiRouteEnum.CONTACT_DETAIL + "?id=1")
      .expect(200);
    done();
  });

  test("Unauthenticated user can update contacts data", async (done) => {
    await supertest(app)
      .patch(ApiRouteEnum.CONTACT)
      .send({
        id: 1,
        email: "anewemail@email.com",
      })
      .expect(200);

    done();
  });

  test("Missing id should fail", async (done) => {
    const response = await supertest(app).patch(ApiRouteEnum.CONTACT).send({
      email: "anewemail@email.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing id.");
    done();
  });

  test("Incorrect value for enquiryType should fail", async (done) => {
    const response = await supertest(app).patch(ApiRouteEnum.CONTACT).send({
      id: 1,
      enquiryType: "this should fail",
    });

    expect(response.status).toBe(400);
    done();
  });
});
