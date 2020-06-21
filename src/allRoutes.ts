import { bikeGetAllAction } from "./controllers/BikeGetAllAction";
import { bikeGetOneAction } from "./controllers/BikeGetOneAction";
import { authMiddlewareFunc } from "./middleware/AuthDummyUser";

const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

const ROUTES = {
  BIKE_ALL: "/bike",
  BIKE_DETAIL: "/bike/detail",
};
export const AppRoutes = [
  {
    path: ROUTES.BIKE_ALL,
    method: METHODS.GET,
    action: bikeGetAllAction,
    middlewares: [authMiddlewareFunc],
  },
  {
    path: ROUTES.BIKE_DETAIL,
    method: METHODS.GET,
    action: bikeGetOneAction,
    middlewares: [],
  },
];
