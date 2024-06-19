import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { checkDataAndRespond, formatDate } from "../../utils/utils";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res, next) => {
  const { id } = req?.user!;
  const result = await BookingServices.createBookingIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingsByAdminFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const checkAvailableBooking = catchAsync(async (req, res, next) => {
  const { date } = req.query;

  const _newDate = date ? new Date(date as string) : new Date();
  const formattedDate = formatDate(_newDate);

  const result = await BookingServices.checkAvailabilityIntoDB(formattedDate);

  // Check if data is empty and respond accordingly
  const noDataResponse = checkDataAndRespond(res, result);
  if (noDataResponse) return;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availability checked successfully",
    data: result,
  });
});

const getAllBookingsByUser = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingsByUserFromDB(req.query);

  // Check if data is empty and respond accordingly
  const noDataResponse = checkDataAndRespond(res, result);
  if (noDataResponse) return;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const cancelBookingByUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BookingServices.cancelBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  checkAvailableBooking,
  getAllBookingsByUser,
  cancelBookingByUser,
};
