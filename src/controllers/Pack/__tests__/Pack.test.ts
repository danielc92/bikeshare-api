import * as supertest from "supertest";
import { connection } from "~/utils/connection";
import { ApiRouteEnum } from "~/entity/Permission";
import { app } from "~/app";
import { API_MESSAGES } from "~/utils/messages";

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

  test("Unauthenticated user can get packs list", async (done) => {
    await supertest(app).get(ApiRouteEnum.PACK).expect(200);

    done();
  });

  test("Authenticated rider can create a pack", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    await supertest(app)
      .post(ApiRouteEnum.PACK)
      .set({ token: user.body.token })
      .send({
        packName: "West Pack",
        packMotto: "The best pack in the western hemisphere!",
      })
      .expect(200);

    done();
  });

  test("Authenticated rider can update a pack", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "test@test.com", password: "secret" });
    expect(user.status).toBe(200);

    await supertest(app)
      .patch(ApiRouteEnum.PACK)
      .set({ token: user.body.token })
      .send({
        id: 1,
        packName: "West Pack (revised)",
      })
      .expect(200);

    done();
  });

  test("Unauthenticated user can get pack detail", async (done) => {
    await supertest(app)
      .get(ApiRouteEnum.PACK_DETAIL + "?id=1")
      .expect(200);

    done();
  });

  test("Unauthenticated user cannot get pack without id", async (done) => {
    const response = await supertest(app).get(ApiRouteEnum.PACK_DETAIL);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(API_MESSAGES.MISSING_ID);

    done();
  });

  test("Unauthenticated cannot delete pack", async (done) => {
    const response = await supertest(app)
      .delete(ApiRouteEnum.PACK + "?id=1")

      .send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(API_MESSAGES.MISSING_TOKEN);
    done();
  });

  test("Authenticated admin can delete pack", async (done) => {
    const user = await supertest(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: "admin@admin.com", password: "secret" });
    expect(user.status).toBe(200);

    await supertest(app)
      .delete(ApiRouteEnum.PACK + "?id=1")
      .set({ token: user.body.token })
      .send()
      .expect(200);

    done();
  });
});
