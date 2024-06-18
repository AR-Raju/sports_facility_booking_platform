import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { FacilityControllers } from "./facility.controller";
import { FacilityValidations } from "./facility.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility
);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityControllers.updateFacility
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility
);

router.get("/", FacilityControllers.getAllFacilties);

export const FacilityRoutes = router;
