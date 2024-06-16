import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUsers = catchAsync(async (req, res, next) => {
  const result = await AuthServices.loginUsers(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: result.accessToken,
    data: result.user,
  });
});

export const AuthControllers = {
  loginUsers,
};
