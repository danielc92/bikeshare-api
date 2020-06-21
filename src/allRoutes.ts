import { bikeGetAllAction } from "./controllers/BikeGetAllAction";
import { bikeGetOneAction } from "./controllers/BikeGetOneAction";
import { bikeDeleteOneAction } from "./controllers/BikeDeleteOneAction";
import { authMiddlewareFunc } from "./middleware/AuthDummyUser";
import { bikeCreateOneAction } from "./controllers/BikeCreateOneAction";
import { Request, Response } from "express";

const ROUTES = {
  BIKE: "/bike",
  BIKE_DETAIL: "/bike/detail",
};

interface IRoute {
  path: string;
  middlewares: any[];
  method: "post" | "put" | "get" | "delete";
  action: (request: Request, response: Response) => Promise<any>;
}

export const AppRoutes: Array<IRoute> = [
  {
    path: ROUTES.BIKE,
    method: "get",
    action: bikeGetAllAction,
    middlewares: [],
  },
  {
    path: ROUTES.BIKE_DETAIL,
    method: "get",
    action: bikeGetOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.BIKE,
    method: "delete",
    action: bikeDeleteOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.BIKE,
    method: "post",
    action: bikeCreateOneAction,
    middlewares: [],
  },
];
