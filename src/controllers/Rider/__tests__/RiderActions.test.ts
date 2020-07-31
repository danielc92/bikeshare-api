import { connection } from "~/utils/connection";
import * as supertest from "supertest";
import { app } from "~/app";
import { API_MESSAGES } from "~/utils/messages";
import { ApiRouteEnum } from "~/entity/Permission";

describe("Rider Test Suite", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.createPermissions();
    await connection.createTestUsers();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  test("Unauthenticated user can get riders", async (done) => {
    await supertest(app).get(ApiRouteEnum.RIDER).expect(200);
    done();
  });

  test("Unauthenticated user can get rider detail", async (done) => {
    await supertest(app)
      .get(ApiRouteEnum.RIDER_DETAIL + "?id=1")
      .expect(200);
    done();
  });

  test("Unauthenticated user cannot update rider, missing token error", async (done) => {
    const response = await supertest(app).patch(ApiRouteEnum.RIDER).send({
      id: 1,
      firstName: "Bob",
    });
    expect(response.body.message).toBe(API_MESSAGES.MISSING_TOKEN);
    expect(response.status).toBe(400);
    done();
  });

  test("Authenticated rider can update only their own data", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .patch(ApiRouteEnum.RIDER)
      .set({ token: user.body.token })
      .send({ id: 1, phone: "0465485550" });
    expect(response.status).toBe(200);

    done();
  });

  test("Authenticated rider cannot update another riders data", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .patch(ApiRouteEnum.RIDER)
      .set({ token: user.body.token })
      .send({ id: 2, phone: "0465485550" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(API_MESSAGES.NO_PERMISSION);
    done();
  });

  test("Admin can delete rider", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "admin@admin.com", password: "secret" });
    expect(user.status).toBe(200);

    await supertest(app)
      .delete(ApiRouteEnum.RIDER + "?id=1")
      .set({ token: user.body.token })
      .send()
      .expect(200);

    done();
  });
});
