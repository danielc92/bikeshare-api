import * as request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { populatePermission } from "~/utils/permissions";
import { Rider } from "~/entity";
import { app } from "~/app";
import { ApiRouteEnum } from "~/entity/Permission";

let mockUser = {
  city: "Atlantis",
  phone: "00654654",
  firstName: "Daniel",
  lastName: "Corcoran",
  password: "12345",
  email: "daniel-test-user-1@daniel-test-user.com",
};
describe("Bike Suite", () => {
  beforeAll(async (done) => {
    await createConnection();
    await populatePermission();
    done();
  });

  afterAll(async (done) => {
    await getConnection().close();
    done();
  });

  test("Unauthenticated user can access bike list", async () => {
    const response = await request(app).get(ApiRouteEnum.BIKE).expect(200);
  });

  test("Bike list contains the property - 'results'", async () => {
    const response = await request(app).get(ApiRouteEnum.BIKE);
    expect(response.body).toHaveProperty("results");
  });

  test("Unauthenticated user cannot delete a bike, receives status 400", async () => {
    await request(app).delete(ApiRouteEnum.BIKE).send({}).expect(400);
  });

  test("Unauthenticated user cannot delete a bike, message contains 'Missing auth token'", async () => {
    const response = await request(app).delete(ApiRouteEnum.BIKE).send({});
    expect(response.body.message).toBe("Missing auth token");
  });

  test("Unauthenticated user cannot create a new bike", async () => {
    await request(app)
      .post(ApiRouteEnum.BIKE)
      .send({ modelCode: "M1" })
      .expect(401);
  });

  test("Unauthenticated user cannot update bike, receives status 400", async () => {
    const response = await request(app).patch(ApiRouteEnum.BIKE).send({});

    expect(response.status).toBe(400);
  });

  test("Unauthenticated user cannot update bike, message contains 'Missing auth token'", async () => {
    const response = await request(app).patch(ApiRouteEnum.BIKE).send({});
    expect(response.body.message).toBe("Missing auth token");
  });

  test("Unauthenticated user cannot create bike, receives status 400", async () => {
    const response = await request(app).post(ApiRouteEnum.BIKE).send({});

    expect(response.status).toBe(400);
  });

  test("Unauthenticated user cannot create bike, message contains 'Missing auth token'", async () => {
    const response = await request(app).post(ApiRouteEnum.BIKE).send({});
    expect(response.body.message).toBe("Missing auth token");
  });

  test("User can be created", async () => {
    await request(app).post(ApiRouteEnum.RIDER).send(mockUser).expect(200);
  });

  test("User can log in, and can create a new bike instance", async () => {
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
  });
});
