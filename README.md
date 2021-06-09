# Bikeshare API

A bike share REST-API, designed with Node.js, Typescript, TypeORM, Postgres & Docker

### Stack

- Typescript
- Node.js
- TypeORM
- Docker
- Postgres

### Getting started

Prerequisites:
- Install NVM node package manager
- Install docker for desktop
#### Node 
```
# Using node package manager install version 12
nvm install 12.0.0

nvm use 12.0.0

# You may check what version is currently being used with
nvm list

# you will need nodemon
npm i -g nodemon

# install rest of dependencies
npm i
```
#### Running development server
```
# Start the docker postgres db
npm run db-start
# Run the development api server
npm run dev
```
#### Testing the controllers
```
# Start the docker postgres db (if you haven't done so already)
npm run db-start
# Running all tests
npm run test
```

#### Testing in postman
- Import the collection from postman folder
- Set `{{host}}` global variable to http://localhost:3050 (or whatever it is set to in `src/index.ts`)
- Set `{{token}}` global variable if youre using authentication. This token is obtainable, each time a successful request to `{{host}}/auth/login` is made
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

```sql
INSERT INTO permission
("apiRoute", "requestMethod")
VALUES
('/bike', 'get'),('/bike', 'post'),('/bike', 'patch'),('/bike', 'delete'),
('/bike/detail','get'),
('/route', 'get'),('/route', 'post'),('/route', 'patch'),('/route', 'delete'),
('/route/detail','get'),
('/rider', 'get'),('/rider', 'post'),('/rider', 'patch'),('/rider', 'delete'),
('/rider/detail','get'),
('/brand', 'get'),('/brand', 'post'),('/brand', 'patch'),('/brand', 'delete'),
('/brand/detail','get'),
('/contact', 'get'),('/contact', 'post'),('/contact', 'patch'),('/contact', 'delete'),
('/contact/detail','get'),
('/pack', 'get'),('/pack', 'post'),('/pack', 'patch'),('/pack', 'delete'),
('/pack/detail','get'),
('/my-packs', 'get'),('/my-packs', 'patch'),('/my-packs', 'delete'),
('/my-routes', 'get'),('/my-routes', 'patch'),('/my-routes', 'delete'),
('/auth/login','post')
;
```
