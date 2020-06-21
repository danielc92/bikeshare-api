import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";

import { AppRoutes } from "./allRoutes";
import { authMiddlewareFunc } from "./middleware/AuthDummyUser";

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

// {
//   path: string;
//   middlewares: any[];
//   action: (
//     request: express.Request,
//     response: express.Response
//   ) => Promise<void>;
// }
