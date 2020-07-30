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

  async prepopulate() {
    await getConnection();
    await populatePermission();

    // Create a test user too
    const testUser = new Rider();
    testUser.email = "test@test.com";
    testUser.password = await bcrypt.hash("secret", 10);
    testUser.firstName = "stan";
    testUser.lastName = "smith";
    const roleRepo = getManager().getRepository(Role);
    testUser.role = await roleRepo.findOne({ where: { role: "RIDER" } });
    await getManager().save(testUser);
  },
};

export { connection };
