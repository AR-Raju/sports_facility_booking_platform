import { Schema, model } from "mongoose";
import { FacilityModel, TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility, FacilityModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  pricePerHour: {
    type: Number,
    required: [true, "Price per hour is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Filtering deleted documents while get all
facilitySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Filtering deleted document while get one
facilitySchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// Checking if facility already exists
facilitySchema.statics.isFacilityExists = async function (name: string) {
  const existingFacility = await this.findOne({
    name,
    isDeleted: { $ne: true },
  });
  return !!existingFacility;
};

export const Facility = model<TFacility, FacilityModel>(
  "Facility",
  facilitySchema
);
