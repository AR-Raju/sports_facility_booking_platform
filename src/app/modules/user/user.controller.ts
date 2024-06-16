import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUserInfoDB(req.body);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
};
