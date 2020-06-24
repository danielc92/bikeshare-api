import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { AppRoutes } from "./allRoutes";

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(express.json());
    AppRoutes.forEach((route) => {
      app[route.method](
        route.path,
        route.middlewares,
        (
          request: express.Request,
          response: express.Response,
          next: Function
        ) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });
    app.listen(3000);
  })
  .catch((error) => console.log(error));
