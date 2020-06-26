# Bikeshare API

A bike share REST-API, designed with Node.js, Typescript, TypeORM, Postgres & Docker

### Stack

- Typescript
- Node.js
- TypeORM
- Docker
- Postgres

### Instructions

Running the project

```
npm run start
```

### Available Routes

- /auth/login (allows Riders to authenticate and retrieve jwt token)
- /rider (allows for create, delete, update, retrieval of Rider data)
- /route (allows for create, delete, update, retrieval of Route data)
- /pack (allows for create, delete, update, retrieval of Pack data)
- /bike (allows for create, delete, update, retrieval of Bike data)
- /contact (allows for create, delete, update, retrieval of Contact data)
- /my-routes (allows for create, delete, retrieval of Rider-Route associations)
- /my-packs (allows for create, delete, retrieval of Rider-Pack associations)

### Configuration

TypeORM configuration can be modified in `ormconfig.json` in root of project. Currently the project uses a docker/postgres setup for local development.

### Examples

Loading many to many

```
const data = await connection
    .getRepository(Rider)
    .createQueryBuilder("rider")
    .leftJoinAndSelect("rider.routes", "route")
    .getMany();
```

Saving many to many

```
let z = connection.getRepository(Route);
let results = await z.find();
let x = connection.getRepository(Rider);
let rider = await x.findOne();
console.log(rider);
rider.routes = results;
await connection.manager.save(rider);

```

Deleting many to many

```
  let aRider = await connection
      .getRepository(Rider)
      .findOne({ where: { id: 3 }, relations: ["packs"] });

    aRider.packs = aRider.packs.filter((p) => p.id !== 3);
    await connection.manager.save(aRider);
```
