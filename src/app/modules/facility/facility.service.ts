import httpStatus from "http-status";
import AppError from "../../errors/AppError";

import QueryBuilder from "../../builder/QueryBuilder";
import { FacilitySearchableFields } from "./facility.constant";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  if (await Facility.isFacilityExists(payload.name)) {
    throw new AppError(httpStatus.CONFLICT, "Facility already exists!");
  }
  const result = await Facility.create(payload);
  return result;
};

const getAllFacilityFromDB = async (query: Record<string, unknown>) => {
  const searchQuery = new QueryBuilder(Facility.find(), query)
    .search(FacilitySearchableFields)
    .paginate()
    .filter()
    .fields();

  const result = await searchQuery.modelQuery;
  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const result = Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
};
