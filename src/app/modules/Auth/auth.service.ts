import httpStatus from "http-status";
import Jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUsers = async (payload: TLoginUser) => {
  // check if user exists
  if (!(await User.isUserExistsByEmail(payload?.email))) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  const user = await User.findOne({ email: payload?.email });

  // check if password matches
  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");
  }

  // create token and send to the client
  const jwtPayload = {
    id: user?._id,
    role: user?.role,
  };
  const accessToken = Jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    user,
  };
};

export const AuthServices = {
  loginUsers,
};
