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
import { contactGetAllAction } from "./controllers/Contact/ContactGetAllAction";
import { contactGetOneAction } from "./controllers/Contact/ContactGetOneAction";
import { contactCreateOneAction } from "./controllers/Contact/ContactCreateOneAction";
import { contactDeleteOneAction } from "./controllers/Contact/ContactDeleteOneAction";
import { contactUpdateOneAction } from "./controllers/Contact/ContactUpdateOneAction";
import { ApiRouteEnum, MethodEnum } from "./entity/Permission";

interface IRoute {
  path: ApiRouteEnum;
  middlewares: any[];
  method: MethodEnum;
  action: (request: Request, response: Response) => Promise<any>;
}

export const AppRoutes: Array<IRoute> = [
  {
    path: ApiRouteEnum.BIKE,
    method: MethodEnum.GET,
    action: bikeGetAllAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.BIKE_DETAIL,
    method: MethodEnum.GET,
    action: bikeGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.BIKE,
    method: MethodEnum.DELETE,
    action: bikeDeleteOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.BIKE,
    method: MethodEnum.POST,
    action: bikeCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.BIKE,
    method: MethodEnum.PATCH,
    action: bikeUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.ROUTE,
    method: MethodEnum.GET,
    action: routeGetAllAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.ROUTE,
    method: MethodEnum.POST,
    action: routeCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.ROUTE_DETAIL,
    method: MethodEnum.GET,
    action: routeGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.ROUTE,
    method: MethodEnum.PATCH,
    action: routeUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.RIDER,
    method: MethodEnum.GET,
    action: riderGetAllAction,
    middlewares: [roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.RIDER_DETAIL,
    method: MethodEnum.GET,
    action: riderGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.RIDER,
    method: MethodEnum.PATCH,
    action: riderUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.RIDER,
    method: MethodEnum.POST,
    action: riderCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.RIDER,
    method: MethodEnum.DELETE,
    action: riderDeleteOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.BRAND,
    method: MethodEnum.GET,
    action: brandGetAllAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.BRAND_DETAIL,
    method: MethodEnum.GET,
    action: brandGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.BRAND,
    method: MethodEnum.POST,
    action: brandCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.BRAND,
    method: MethodEnum.DELETE,
    action: brandDeleteOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.BRAND,
    method: MethodEnum.PATCH,
    action: brandUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.CONTACT,
    method: MethodEnum.GET,
    action: contactGetAllAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.CONTACT_DETAIL,
    method: MethodEnum.GET,
    action: contactGetOneAction,
    middlewares: [roleAndPermissionMiddleware],
  },
  {
    path: ApiRouteEnum.CONTACT,
    method: MethodEnum.POST,
    action: contactCreateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.CONTACT,
    method: MethodEnum.DELETE,
    action: contactDeleteOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.CONTACT,
    method: MethodEnum.PATCH,
    action: contactUpdateOneAction,
    middlewares: [authMiddlewareFunc, roleAndPermissionMiddleware],
  },

  {
    path: ApiRouteEnum.AUTH_LOGIN,
    method: MethodEnum.POST,
    action: loginAction,
    middlewares: [roleAndPermissionMiddleware],
  },
];
