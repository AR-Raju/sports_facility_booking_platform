import { Router } from "express";

import { AuthRoutes } from "../modules/Auth/auth.route";
import { FacilityRoutes } from "../modules/facility/facility.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/facility",
    route: FacilityRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
