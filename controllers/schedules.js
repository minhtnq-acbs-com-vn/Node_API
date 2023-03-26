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

const getSchedule = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Schedules", {
    _id: ObjectId(req.params.id),
    userID: req.headers["userid"],
  });
  if (documents.length < 1)
    throw new Error(`Can't find ${req.params.id} & ${req.headers["userid"]},`);
  res.status(200).json(documents);
});

const getAllSchedule = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Schedules", { userID: req.headers["userid"] });
  if (documents.length < 1)
    throw new Error(`Can't find ${req.params.id} & ${req.headers["userid"]}`);
  res.status(200).json(documents);
});

const addSchedule = asyncHandler(async (req, res, next) => {
  const { error } = validateCreateSchedule(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let result = await dbWrite("Schedules", req.body);
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true, info: result.insertedId });
});

const updateSchedule = asyncHandler(async (req, res, next) => {
  const { error } = validateUpdateSchedule(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  if (!ObjectId.isValid(req.params.id))
    throw new Error(`ID:${req.params.id} is invalid`);
  let documents = await dbRead("Schedules", { _id: ObjectId(req.params.id) });
  if (documents.length < 1) throw new Error(`ID:${req.params.id} dont exists`);
  let result = await dbUpdate(
    "Schedules",
    { _id: ObjectId(req.params.id) },
    {
      timeOn: req.body.timeOn,
      timeOff: req.body.timeOff,
      repeat: req.body.repeat,
      dayOfTheWeek: req.body.dayOfTheWeek,
      request: req.body.request,
    }
  );
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  console.log(result);
  res.status(200).json({ success: true });
});

const deleteSchedule = asyncHandler(async (req, res, next) => {
  let result = await dbDelete("Schedules", req.params.id);
  if (result == null || result.deletedCount !== 1)
    throw new Error(`ID:${schedulesID} is invalid to delete`);
  res.status(200).json({ success: true });
});

export {
  getSchedule,
  getAllSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};
