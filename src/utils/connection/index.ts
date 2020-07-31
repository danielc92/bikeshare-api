import { createConnection, getConnection, getManager } from "typeorm";
import { populatePermission } from "../permissions";
import { Rider } from "~/entity";
import * as bcrypt from "bcrypt";
import { RoleEnum, Role } from "~/entity/Role";

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
};

export { connection };
