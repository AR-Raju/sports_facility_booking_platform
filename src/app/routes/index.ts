import { Router } from "express";

import { AuthRoutes } from "../modules/Auth/auth.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { checkAvailabilityRoutes } from "../modules/booking/checkAvailability.route";
import { FacilityRoutes } from "../modules/facility/facility.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/",
    route: checkAvailabilityRoutes,
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
