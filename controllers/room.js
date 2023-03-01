import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead } from "../utils/databaseManage.js";

const getAllRooms = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Device");
  if (documents.length < 1) throw new Error(`Cant find any room`);
  let roomArr = [];
  for (let i = 0; i < documents.length; i++) roomArr.push(documents[i]["room"]);
  let uniqueRoom = roomArr.filter((c, i) => roomArr.indexOf(c) === i);
  res.status(200).json({ uniqueRoom });
});

const getRoomDevices = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Device", { room: req.params.id });
  if (documents.length < 1)
    throw new Error(`Can't find ${req.params.id} in Room`);
  res.status(200).json(documents);
});

const getRoomSchedules = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Schedules", { room: req.params.id });
  if (documents.length < 1)
    throw new Error(`Can't find ${req.params.id} in Room`);
  res.status(200).json(documents);
});

export { getAllRooms, getRoomDevices, getRoomSchedules };
