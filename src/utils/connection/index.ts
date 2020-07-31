import { createConnection, getConnection, getManager } from "typeorm";
import { populatePermission } from "../permissions";
import { Rider, Route, Pack } from "~/entity";
import * as bcrypt from "bcrypt";
import { Role } from "~/entity/Role";
import { RouteDifficultyEnum } from "~/entity/Route";

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },

  async createPermissions() {
    await getConnection();
    await populatePermission();
  },

  async createTestUsers() {
    await getConnection();
    const roleRepo = getManager().getRepository(Role);
    // Create a test user too
    const rider = new Rider();
    rider.email = "test@test.com";
    rider.password = await bcrypt.hash("secret", 10);
    rider.firstName = "stan";
    rider.lastName = "smith";

    rider.role = await roleRepo.findOne({ where: { role: "RIDER" } });
    await getManager().save(rider);

    const admin = new Rider();
    admin.email = "admin@admin.com";
    admin.password = await bcrypt.hash("secret", 10);
    admin.firstName = "jerry";
    admin.lastName = "rogers";
    admin.role = await roleRepo.findOne({ where: { role: "ADMINISTRATOR" } });
    await getManager().save(admin);
  },
  async createTestPacks() {
    await getConnection();
    let repo = getManager().getRepository(Pack);

    const pack1 = repo.create({
      packName: "A test pack",
      packMotto: "A test motto",
    });

    await repo.save(pack1);
    const pack2 = repo.create({
      packName: "A test pack 2",
      packMotto: "A test motto 2",
    });
    await repo.save(pack2);
  },
  async createTestRoutes() {
    await getConnection();
    let repo = getManager().getRepository(Route);
    const route1 = repo.create({
      area: "Melbourne",
      difficulty: RouteDifficultyEnum.MEDIUM,
      totalDistance: 40000,
    });
    await repo.save(route1);
    const route2 = repo.create({
      area: "Collingwood",
      difficulty: RouteDifficultyEnum.MEDIUM,
      totalDistance: 3400,
    });
    await repo.save(route2);
  },
};

export { connection };
