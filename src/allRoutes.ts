import { bikeGetAllAction } from "./controllers/BikeGetAllAction";
import { authMiddlewareFunc } from "./middleware/AuthDummyUser";

export const AppRoutes = [
  {
    path: "/api/bikes",
    method: "get",
    action: bikeGetAllAction,
    middlewares: [authMiddlewareFunc],
  },
];
