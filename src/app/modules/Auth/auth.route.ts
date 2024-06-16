import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "../user/user.controller";
import { UserValidations } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import { AuthValidations } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUsers
);

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser
);

export const AuthRoutes = router;
