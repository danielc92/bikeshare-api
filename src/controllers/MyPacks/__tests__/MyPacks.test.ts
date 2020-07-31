import { connection } from "~/utils/connection";
import * as supertest from "supertest";
import { app } from "~/app";
import { ApiRouteEnum } from "~/entity/Permission";
import { API_MESSAGES } from "~/utils/messages";
import { doesNotThrow } from "assert";

describe("Rider-Packs Suite", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.createPermissions();
    await connection.createTestUsers();
    await connection.createTestPacks();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  test("Unauthenticated user cannot delete", async (done) => {
    const response = await supertest(app).delete(ApiRouteEnum.MY_PACKS).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(API_MESSAGES.MISSING_TOKEN);
    done();
  });

  test("Authenticated rider can add a pack to their list", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .patch(ApiRouteEnum.MY_PACKS)
      .set({ token: user.body.token })
      .send({ packId: 1 });

    expect(response.status).toBe(200);
    done();
  });

  test("Authenticated rider can get a list of packs they've joined", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .get(ApiRouteEnum.MY_PACKS)
      .set({ token: user.body.token });

    expect(response.body).toHaveProperty("packs");
    expect(response.body.packs.length).toBeGreaterThanOrEqual(1);
    expect(response.status).toBe(200);
    done();
  });

  test("Authenticated rider remove a pack from their list", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .delete(ApiRouteEnum.MY_PACKS)
      .set({ token: user.body.token })
      .send({ packId: 1 });

    expect(response.status).toBe(200);
    done();
  });

  test("Authenticated receives error for adding pack that doesnt exist", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    const response = await supertest(app)
      .patch(ApiRouteEnum.MY_PACKS)
      .set({ token: user.body.token })
      .send({ packId: 99999 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(API_MESSAGES.NOT_FOUND);
    done();
  });
});
