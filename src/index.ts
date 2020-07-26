import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";
import { AppRoutes } from "./allRoutes";
import { client } from "./redis_client";
import * as fs from "fs";
import * as path from "path";

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "morgan_logs/access.log"),
  { flags: "a" }
);

createConnection()
  .then(async (connection) => {
    // Listen for redis client error
    client.on("error", function (error) {
      console.error(error);
    });

    // Create express app instance
    const app = express();

    // Apply third party middlewares
    app.use(helmet());
    app.use(
      logger("combined", {
        stream: accessLogStream,
      })
    );
    app.use(cors());
    app.use(express.json());

    // Dynamically apply all routes
    AppRoutes.forEach((route) => {
      app[route.method](
        route.path,
        route.middlewares,
        (
          request: express.Request,
          response: express.Response,
          next: express.NextFunction
        ) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    app.listen(3050);
  })
  .catch((error) => console.log(error));

// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import * as express from "express";
// import { AppRoutes } from "./allRoutes";
// import { client } from "./redis_client";
// import * as cluster from "cluster";

// createConnection()
//   .then(async (connection) => {
//     if (cluster.isMaster) {
//       console.log(`Master ${process.pid} is running.`);

//       for (let i = 0; i < 16; i++) {
//         cluster.fork();
//       }

//       cluster.on("online", (worker: cluster.Worker) => {
//         console.log(`Worker is online ${worker.process.pid}`);
//       });
//       cluster.on(
//         "exit",
//         (worker: cluster.Worker, code: number, signal: string) => {
//           console.log(`Worker ${worker.process.pid} died`);
//         }
//       );
//     } else {
//       const app = express();
//       app.use(express.json());
//       AppRoutes.forEach((route) => {
//         app[route.method](
//           route.path,
//           route.middlewares,
//           (
//             request: express.Request,
//             response: express.Response,
//             next: Function
//           ) => {
//             route
//               .action(request, response)
//               .then(() => next)
//               .catch((err) => next(err));
//           }
//         );
//       });
//       client.on("error", function (error) {
//         console.error(error);
//       });
//       app.listen(3050);
//     }
//   })
//   .catch((error) => console.log(error));
