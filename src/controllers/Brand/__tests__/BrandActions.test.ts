import { getConnection, createConnection } from "typeorm";
import { populatePermission } from "~/utils/permissions";
import { brandDeleteOneAction } from "../BrandDeleteOneAction";
import * as request from "supertest";
import { app } from "~/app";
import { ApiRouteEnum } from "~/entity/Permission";
import { connection } from "~/utils/connection";

const mockUser = {
  city: "Atlantis",
  phone: "00654654",
  firstName: "Daniel",
  lastName: "Corcoran",
  password: "12345",
  email: "daniel-test-user-1@daniel-test-user.com",
};

describe("Brand Suite", () => {
  beforeAll(async () => {
    await connection.create();
    await connection.prepopulate();
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

  test("User can be created", async (done) => {
    await request(app).post(ApiRouteEnum.RIDER).send(mockUser).expect(200);
    done();
  });

  let brandId;
  test("User can log in, and can create a new brand", async (done) => {
    const response = await request(app)
      .post(ApiRouteEnum.AUTH_LOGIN)
      .send({ email: mockUser.email, password: mockUser.password });

    expect(response.status).toBe(200);
    const { token } = response.body;

    const response2 = await request(app)
      .post(ApiRouteEnum.BRAND)
      .set({ token })
      .send({
        title: "Awesome brand!",
      });

    // Set the brand id for the next test
    brandId = response2.body.id;
    expect(response.status).toBe(200);

    done();
  });

  test("Unauthenticated user can get brand detail", async (done) => {
    await request(app)
      .get(`${ApiRouteEnum.BRAND_DETAIL}?id=${brandId}`)
      .expect(200);
    done();
  });

  test("Unauthenticated user can get brand list", async (done) => {
    await request(app).get(ApiRouteEnum.BRAND).expect(200);
    done();
  });
});
