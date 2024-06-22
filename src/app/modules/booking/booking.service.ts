import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { BOOKING_STATUS, BookingSearchableFields } from "./booking.constant";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const { startTime, endTime, facility } = payload;

  //   check is the facility exits
  const isFacilityExists = await Facility.findById(facility);
  if (!isFacilityExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Facility doesn't exists for this booking"
    );
  }

  const { pricePerHour } = isFacilityExists;

  const modifiedUpdateData: Record<string, unknown> = { ...payload };

  if (endTime && startTime) {
    // Convert startTime and endTime to Date objects
    const startDateTime = new Date(`1970-01-01T${startTime}:00`);
    const endDateTime = new Date(`1970-01-01T${endTime}:00`);

    // Calculate the difference in hours
    const durationInHours =
      (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

    // Calculate payableAmount
    const payableAmount = durationInHours * pricePerHour;

    modifiedUpdateData["user"] = id;
    modifiedUpdateData["payableAmount"] = payableAmount;
    modifiedUpdateData["isBooked"] = BOOKING_STATUS.Confirmed;
  }

  const result = await Booking.create(modifiedUpdateData);
  return result;
};

const getAllBookingsByAdminFromDB = async (query: Record<string, unknown>) => {
  const searchQuery = new QueryBuilder(
    Booking.find().populate("facility").populate("user"),
    query
  )
    .search(BookingSearchableFields)
    .paginate()
    .filter()
    .fields();

  const result = await searchQuery.modelQuery;
  return result;
};

const createAllDaySlots = (slotDuration: number) => {
  const startHour = 0;
  const endHour = 24;
  const allSlots = [];

  for (let hour = startHour; hour < endHour; hour += slotDuration) {
    const startTime = `${hour.toString().padStart(2, "0")}:00`;
    const endTime = `${(hour + slotDuration).toString().padStart(2, "0")}:00`;
    allSlots.push({ startTime, endTime });
  }

  return allSlots;
};

const checkAvailabilityIntoDB = async (date: string) => {
  const allSlots = createAllDaySlots(2);

  const resultBookings = await Booking.find({ date: { $eq: date } });

  const bookedSlots = resultBookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));

  const availableSlots = allSlots.filter((slot) => {
    return !bookedSlots.some(
      (bookedSlot) =>
        slot.startTime === bookedSlot.startTime &&
        slot.endTime === bookedSlot.endTime
    );
  });

  return availableSlots;
};

const getAllBookingsByUserFromDB = async (query: Record<string, unknown>) => {
  const searchQuery = new QueryBuilder(
    Booking.find().populate("facility"),
    query
  )
    .search(BookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await searchQuery.modelQuery;
  return result;
};

const cancelBookingFromDB = async (id: string) => {
  const result = Booking.findByIdAndUpdate(
    id,
    { isBooked: BOOKING_STATUS.Canceled },
    {
      new: true,
    }
  );

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsByAdminFromDB,
  checkAvailabilityIntoDB,
  getAllBookingsByUserFromDB,
  cancelBookingFromDB,
};
