import { ServerRoute } from "@hapi/hapi";
import healthRoutes from "./health";
import userRoutes from "./user.routes";

let routes: ServerRoute[] = [];
routes = routes.concat(userRoutes, healthRoutes);
export default routes;