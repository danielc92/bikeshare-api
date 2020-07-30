import { connection } from "~/utils/connection";
import * as supertest from "supertest";
import { app } from "~/app";
import { ApiRouteEnum } from "~/entity/Permission";
import { response } from "express";

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
    done();
  });

  test("Unauthenticated user can get contacts data", async (done) => {
    await supertest(app).get(ApiRouteEnum.CONTACT).expect(200);
    done();
  });

  test("Unauthenticated user can get contacts details data", async (done) => {
    await supertest(app).get(ApiRouteEnum.CONTACT_DETAIL + "?id=1");
    done();
  });

  test("Unauthenticated user can update contacts data", async (done) => {
    await supertest(app).patch(ApiRouteEnum.CONTACT).send({
      id: 1,
      email: "anewemail@email.com",
    });

    done();
  });

  test("Missing id should fail", async (done) => {
    const response = await supertest(app).patch(ApiRouteEnum.CONTACT).send({
      email: "anewemail@email.com",
    });

    done();
  });

  test("Incorrect value for enquiryType should fail", async (done) => {
    const response = await supertest(app).patch(ApiRouteEnum.CONTACT).send({
      id: 1,
      enquiryType: "this should fail",
    });

    done();
  });

  test("Unauthenticated user should not delete contact", async (done) => {
    const response = await supertest(app)
      .delete(ApiRouteEnum.CONTACT)
      .send({ id: 1 });
    done();
  });

  test("Authenticated user should not delete contact", async (done) => {
    // Login
    const response = await supertest(app).post(ApiRouteEnum.AUTH_LOGIN).send({
      email: "test@test.com",
      password: "secret",
    });

    // Delete
    const response2 = await supertest(app)
      .delete(ApiRouteEnum.CONTACT + "?id=1")
      .set({ token: response.body.token })
      .send();

    expect(response2.body.message).toBe("No permission to resource");
    expect(response2.status).toBe(400);
    done();
  });
});
