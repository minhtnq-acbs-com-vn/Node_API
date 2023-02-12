import { asyncHandler } from "../utils/asyncHandler.js";
import {
  dbRead,
  dbWrite,
  dbUpdate,
  dbDelete,
} from "../utils/databaseManage.js";
import {
  validateCreateSchedule,
  validateUpdateSchedule,
} from "../utils/validator.js";
import { ObjectId } from "mongodb";

const addSchedule = asyncHandler(async (req, res, next) => {
  const { error } = validateCreateSchedule(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let result = await dbWrite("Schedules", req.body);
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

const updateSchedule = asyncHandler(async (req, res, next) => {
  const { error } = validateUpdateSchedule(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let schedulesID = req.params.id;
  let newSchedule = req.body;
  if (!ObjectId.isValid(schedulesID))
    throw new Error(`ID:${schedulesID} is invalid`);
  let documents = await dbRead("Schedules", { _id: ObjectId(schedulesID) });
  if (documents.length < 1) throw new Error(`ID:${schedulesID} dont exists`);
  let result = await dbUpdate("Schedules", {
    timeOn: newSchedule.timeOn,
    timeOff: newSchedule.timeOff,
    repeat: newSchedule.repeat,
    dayOfTheWeek: newSchedule.dayOfTheWeek,
    request: newSchedule.request,
  });
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

const deleteSchedule = asyncHandler(async (req, res, next) => {
  let schedulesID = req.params.id;
  let result = await dbDelete("Schedules", schedulesID);
  if (result == null || result.deletedCount !== 1)
    throw new Error(`ID:${schedulesID} is invalid to delete`);
  res.status(200).json({ success: true });
});

export { addSchedule, updateSchedule, deleteSchedule };
