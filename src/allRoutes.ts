import { bikeGetAllAction } from "./controllers/Bike/BikeGetAllAction";
import { bikeGetOneAction } from "./controllers/Bike/BikeGetOneAction";
import { bikeDeleteOneAction } from "./controllers/Bike/BikeDeleteOneAction";
import { authMiddlewareFunc } from "./middleware/CheckRiderIsAuthenticated";
import { bikeCreateOneAction } from "./controllers/Bike/BikeCreateOneAction";
import { Request, Response } from "express";
import { bikeUpdateOneAction } from "./controllers/Bike/BikeUpdateOneAction";
import { routeGetAllAction } from "./controllers/Route/RouteGetAllAction";
import { routeCreateOneAction } from "./controllers/Route/RouteCreateOneAction";
import { routeGetOneAction } from "./controllers/Route/RouteGetOneAction";
import { routeUpdateOneAction } from "./controllers/Route/RouteUpdateOneAction";
import { riderGetAllAction } from "./controllers/Rider/RiderGetAllAction";
import { brandGetAllAction } from "./controllers/Brand/BrandGetAllAction";
import { brandGetOneAction } from "./controllers/Brand/BrandGetOneAction";
import { brandUpdateOneAction } from "./controllers/Brand/BrandUpdateOneAction";
import { brandDeleteOneAction } from "./controllers/Brand/BrandDeleteOneAction";
import { brandCreateOneAction } from "./controllers/Brand/BrandCreateOneAction";
import { riderGetOneAction } from "./controllers/Rider/RiderGetOneAction";
import { riderUpdateOneAction } from "./controllers/Rider/RiderUpdateOneAction";
import { riderCreateOneAction } from "./controllers/Rider/RiderCreateOneAction";
import { riderDeleteOneAction } from "./controllers/Rider/RiderDeleteOneAction";
import { loginAction } from "./controllers/Auth/LoginAction";
import { roleAndPermissionMiddleware } from "./middleware/CheckRoleAndPermission";

const ROUTES = {
  RIDER: "/rider",
  RIDER_DETAIL: "/rider/detail",
  BIKE: "/bike",
  BIKE_DETAIL: "/bike/detail",
  BRAND: "/brand",
  BRAND_DETAIL: "/brand/detail",
  ROUTE: "/route",
  ROUTE_DETAIL: "/route/detail",
  AUTH_LOGIN: "/auth/login",
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
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.BIKE_DETAIL,
    method: "get",
    action: bikeGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.BIKE,
    method: "delete",
    action: bikeDeleteOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.BIKE,
    method: "post",
    action: bikeCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.BIKE,
    method: "patch",
    action: bikeUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.ROUTE,
    method: "get",
    action: routeGetAllAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.ROUTE,
    method: "post",
    action: routeCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.ROUTE_DETAIL,
    method: "get",
    action: routeGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.ROUTE,
    method: "patch",
    action: routeUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.RIDER,
    method: "get",
    action: riderGetAllAction,
    middlewares: [roleAndPermissionMiddleware],
  },

  {
    path: ROUTES.RIDER_DETAIL,
    method: "get",
    action: riderGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },

  {
    path: ROUTES.RIDER,
    method: "patch",
    action: riderUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ROUTES.RIDER,
    method: "post",
    action: riderCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ROUTES.RIDER,
    method: "delete",
    action: riderDeleteOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.BRAND,
    method: "get",
    action: brandGetAllAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.BRAND_DETAIL,
    method: "get",
    action: brandGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.BRAND,
    method: "post",
    action: brandCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ROUTES.BRAND,
    method: "delete",
    action: brandDeleteOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ROUTES.BRAND,
    method: "patch",
    action: brandUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ROUTES.AUTH_LOGIN,
    method: "post",
    action: loginAction,
    middlewares: [roleAndPermissionMiddleware],
  },
];
