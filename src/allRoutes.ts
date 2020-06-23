import { bikeGetAllAction } from "./controllers/BikeGetAllAction";
import { bikeGetOneAction } from "./controllers/BikeGetOneAction";
import { bikeDeleteOneAction } from "./controllers/BikeDeleteOneAction";
import { authMiddlewareFunc } from "./middleware/AuthDummyUser";
import { bikeCreateOneAction } from "./controllers/BikeCreateOneAction";
import { Request, Response } from "express";
import { bikeUpdateOneAction } from "./controllers/BikeUpdateOneAction";
import { routeGetAllAction } from "./controllers/RouteGetAllAction";
import { routeCreateOneAction } from "./controllers/RouteCreateOneAction";
import { routeGetOneAction } from "./controllers/RouteGetOneAction";
import { routeUpdateOneAction } from "./controllers/RouteUpdateOneAction";
import { riderGetAllAction } from "./controllers/RiderGetAllAction";
import { brandGetAllAction } from "./controllers/BrandGetAllAction";
import { brandGetOneAction } from "./controllers/BrandGetOneAction";
import { brandUpdateOneAction } from "./controllers/BrandUpdateOneAction";
import { brandDeleteOneAction } from "./controllers/BrandDeleteOneAction";
import { brandCreateOneAction } from "./controllers/BrandCreateOneAction";

const ROUTES = {
  RIDER: "/rider",
  BIKE: "/bike",
  BIKE_DETAIL: "/bike/detail",
  BRAND: "/brand",
  BRAND_DETAIL: "/brand/detail",
  ROUTE: "/route",
  ROUTE_DETAIL: "/route/detail",
};

interface IRoute {
  path: string;
  middlewares: any[];
  method: "post" | "patch" | "get" | "delete";
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
  {
    path: ROUTES.BIKE,
    method: "patch",
    action: bikeUpdateOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.ROUTE,
    method: "get",
    action: routeGetAllAction,
    middlewares: [],
  },
  {
    path: ROUTES.ROUTE,
    method: "post",
    action: routeCreateOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.ROUTE_DETAIL,
    method: "get",
    action: routeGetOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.ROUTE,
    method: "patch",
    action: routeUpdateOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.RIDER,
    method: "get",
    action: riderGetAllAction,
    middlewares: [],
  },
  {
    path: ROUTES.BRAND,
    method: "get",
    action: brandGetAllAction,
    middlewares: [],
  },
  {
    path: ROUTES.BRAND_DETAIL,
    method: "get",
    action: brandGetOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.BRAND,
    method: "post",
    action: brandCreateOneAction,
    middlewares: [],
  },

  {
    path: ROUTES.BRAND,
    method: "delete",
    action: brandDeleteOneAction,
    middlewares: [],
  },

  {
    path: ROUTES.BRAND,
    method: "patch",
    action: brandUpdateOneAction,
    middlewares: [],
  },
];
