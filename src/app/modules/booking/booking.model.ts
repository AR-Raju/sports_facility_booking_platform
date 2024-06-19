import { Schema, model } from "mongoose";
import { booking_status_array } from "./booking.constant";
import { BookingModel, TBooking } from "./booking.interface";

const BookingSchema = new Schema<TBooking, BookingModel>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  facility: { type: Schema.Types.ObjectId, ref: "Facility", required: true },
  payableAmount: { type: Number, required: true },
  isBooked: {
    type: String,
    enum: booking_status_array,
    required: true,
  },
});

export const Booking = model<TBooking, BookingModel>("Booking", BookingSchema);
