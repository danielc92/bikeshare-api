import * as request from "supertest";
import { ApiRouteEnum } from "~/entity/Permission";
import { app } from "~/app";
import { connection } from "~/utils/connection";
import { API_MESSAGES } from "~/utils/messages";

const mockUser = {
  city: "Atlantis",
  phone: "00654654",
  firstName: "Daniel",
  lastName: "Corcoran",
  password: "12345",
  email: "daniel-test-user-1@daniel-test-user.com",
};

describe("Bike Suite", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.createPermissions();
    await connection.createTestUsers();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  test("Unauthenticated user can access bike list", async (done) => {
    const response = await request(app).get(ApiRouteEnum.BIKE).expect(200);
    done();
  });

  test("Bike list contains the property - 'results'", async (done) => {
    const response = await request(app).get(ApiRouteEnum.BIKE);
    expect(response.body).toHaveProperty("results");
    done();
  });

  test("Unauthenticated user cannot delete a bike, receives status 400", async (done) => {
    await request(app).delete(ApiRouteEnum.BIKE).send({}).expect(400);
    done();
  });

  test("Unauthenticated user cannot delete a bike, message contains 'Missing auth token'", async (done) => {
    const response = await request(app).delete(ApiRouteEnum.BIKE).send({});
    expect(response.body.message).toBe(API_MESSAGES.MISSING_TOKEN);
    done();
  });

  test("Unauthenticated user cannot create a new bike", async (done) => {
    await request(app)
      .post(ApiRouteEnum.BIKE)
      .send({ modelCode: "M1" })
      .expect(400);
    done();
  });

  test("Unauthenticated user cannot update bike, receives status 400", async (done) => {
    const response = await request(app).patch(ApiRouteEnum.BIKE).send({});
    expect(response.status).toBe(400);
    done();
  });

  test("Unauthenticated user cannot update bike, message contains 'Missing auth token'", async (done) => {
    const response = await request(app).patch(ApiRouteEnum.BIKE).send({});
    expect(response.body.message).toBe(API_MESSAGES.MISSING_TOKEN);
    done();
  });

  test("Unauthenticated user cannot create bike, receives status 400", async (done) => {
    const response = await request(app).post(ApiRouteEnum.BIKE).send({});
    expect(response.status).toBe(400);
    done();
  });

  test("Unauthenticated user cannot create bike, message contains 'Missing auth token'", async (done) => {
    const response = await request(app).post(ApiRouteEnum.BIKE).send({});
    expect(response.body.message).toBe(API_MESSAGES.MISSING_TOKEN);
    done();
  });

  test("User can be created", async (done) => {
    await request(app).post(ApiRouteEnum.RIDER).send(mockUser).expect(200);
    done();
  });

  test("User can log in, and can create a new bike instance", async (done) => {
    const response = await request(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: mockUser.email, password: mockUser.password });

    expect(response.status).toBe(200);
    const { token } = response.body;

    await request(app)
      .post(ApiRouteEnum.BIKE)
      .set({ token })
      .send({
        modelCode: "M001",
        isAvailable: true,
        colour: "BLUE",
        gender: "MALE",
      })
      .expect(200);

    done();
  });
});
