import * as express from "express";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";
import { AppRoutes } from "../allRoutes";
import * as fs from "fs";
import * as path from "path";

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../logs/access.log"),
  { flags: "a" }
);

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

export { app };
