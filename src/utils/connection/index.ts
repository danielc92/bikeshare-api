import { createConnection, getConnection } from "typeorm";
import { populatePermission } from "../permissions";

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
  },
};

export { connection };
