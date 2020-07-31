import { getConnection, createConnection } from "typeorm";
import { populatePermission } from "~/utils/permissions";
import { brandDeleteOneAction } from "../BrandDeleteOneAction";
import * as request from "supertest";
import { app } from "~/app";
import { ApiRouteEnum } from "~/entity/Permission";
import { connection } from "~/utils/connection";
import { API_MESSAGES } from "~/utils/messages";

describe("Brand Suite", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.createPermissions();
    await connection.createTestUsers();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  test("Unauthenticated user can get brands", async (done) => {
    await request(app).get(ApiRouteEnum.BRAND).expect(200);
    done();
  });

  test("Unauthenticated user cannot delete brand", async (done) => {
    await request(app).delete(ApiRouteEnum.BRAND).send({}).expect(400);
    done();
  });

  test("User can log in, and can create a new brand", async (done) => {
    const response = await request(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });

    expect(response.status).toBe(200);
    const { token } = response.body;

    const response2 = await request(app)
      .post(ApiRouteEnum.BRAND)
      .set({ token })
      .send({
        title: "Awesome brand!",
      });

    expect(response.status).toBe(200);

    done();
  });

  test("Unauthenticated user can get brand detail", async (done) => {
    await request(app).get(`${ApiRouteEnum.BRAND_DETAIL}?id=1`).expect(200);
    done();
  });

  test("Unauthenticated user can get brand detail", async (done) => {
    const response = await request(app).get(ApiRouteEnum.BRAND_DETAIL);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(API_MESSAGES.MISSING_ID);
    done();
  });

  test("Unauthenticated user can get brand list", async (done) => {
    await request(app).get(ApiRouteEnum.BRAND).expect(200);
    done();
  });

  test("Authenticated user can update brand with title", async (done) => {
    const user = await request(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });

    expect(user.status).toBe(200);
    await request(app)
      .patch(ApiRouteEnum.BRAND)
      .set({ token: user.body.token })
      .send({ id: 1, title: "new brand title" })
      .expect(200);
    done();
  });
});
