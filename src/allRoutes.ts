import { bikeGetAllAction } from "./controllers/BikeGetAllAction";
import { bikeGetOneAction } from "./controllers/BikeGetOneAction";
import { bikeDeleteOneAction } from "./controllers/BikeDeleteOneAction";
import { authMiddlewareFunc } from "./middleware/AuthDummyUser";
import { bikeCreateOneAction } from "./controllers/BikeCreateOneAction";

const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

const ROUTES = {
  BIKE: "/bike",
  BIKE_DETAIL: "/bike/detail",
};
export const AppRoutes = [
  {
    path: ROUTES.BIKE,
    method: METHODS.GET,
    action: bikeGetAllAction,
    middlewares: [],
  },
  {
    path: ROUTES.BIKE_DETAIL,
    method: METHODS.GET,
    action: bikeGetOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.BIKE,
    method: METHODS.DELETE,
    action: bikeDeleteOneAction,
    middlewares: [],
  },
  {
    path: ROUTES.BIKE,
    method: METHODS.POST,
    action: bikeCreateOneAction,
    middlewares: [],
  },
];
