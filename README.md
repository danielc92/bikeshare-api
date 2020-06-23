# Bikeshare API

A bike share REST-API, designed with Node.js, Typescript, TypeORM, Postgres & Docker

### Stack

- Typescript
- Node.js
- TypeORM
- Docker
- Postgres

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
