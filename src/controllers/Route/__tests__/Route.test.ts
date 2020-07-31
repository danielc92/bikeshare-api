import { connection } from "~/utils/connection";
import * as supertest from "supertest";
import { app } from "~/app";
import { API_MESSAGES } from "~/utils/messages";
import { ApiRouteEnum } from "~/entity/Permission";

describe("Route Test Suite", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.createPermissions();
    await connection.createTestUsers();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  test("Authenticated rider can create a new routes", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "admin@admin.com", password: "secret" });
    expect(user.status).toBe(200);

    await supertest(app)
      .post(ApiRouteEnum.ROUTE)
      .set({ token: user.body.token })
      .send({ area: "City", totalDistance: 5000, difficulty: "Beginner" })
      .expect(200);

    await supertest(app)
      .post(ApiRouteEnum.ROUTE)
      .set({ token: user.body.token })
      .send({ area: "City", totalDistance: 5000, difficulty: "Hard" })
      .expect(200);
    done();
  });

  test("Unauthenticated user can get Route", async (done) => {
    await supertest(app).get(ApiRouteEnum.ROUTE).expect(200);

    done();
  });

  test("Unauthenticated user can get route detail with id", async (done) => {
    await supertest(app)
      .get(ApiRouteEnum.ROUTE_DETAIL + "?id=1")
      .expect(200);

    done();
  });

  test("Unauthenticated user cannot get route detail without id", async (done) => {
    const response = await supertest(app).get(ApiRouteEnum.ROUTE_DETAIL);
    expect(response.body.message).toBe(API_MESSAGES.MISSING_ID);
    expect(response.status).toBe(400);

    done();
  });

  test("Authenticated rider can update existing route", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    await supertest(app)
      .patch(ApiRouteEnum.ROUTE)
      .set({ token: user.body.token })
      .send({
        id: 1,
        distance: 12000,
      })
      .expect(200);
    done();
  });

  test("Authenticated rider can update existing route", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .patch(ApiRouteEnum.ROUTE)
      .set({ token: user.body.token })
      .send({
        distance: 12000,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(API_MESSAGES.MISSING_ID);

    done();
  });

  test("Authenticated rider cant delete route", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .delete(ApiRouteEnum.ROUTE + "?id=1")
      .set({ token: user.body.token });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(API_MESSAGES.NO_PERMISSION);
    done();
  });

  test("Authenticated admin can delete route", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "admin@admin.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .delete(ApiRouteEnum.ROUTE + "?id=1")
      .set({ token: user.body.token });

    expect(response.status).toBe(200);
    done();
  });
});
