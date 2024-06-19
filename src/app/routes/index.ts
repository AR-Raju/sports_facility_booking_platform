import { Router } from "express";

import { AuthRoutes } from "../modules/Auth/auth.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { FacilityRoutes } from "../modules/facility/facility.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/facility",
    route: FacilityRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
