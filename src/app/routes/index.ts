import { Router } from "express";

import { FacultyRoutes } from "../modules/faculty/faculty.route";

import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  }
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
