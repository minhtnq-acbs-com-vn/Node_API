import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead } from "../utils/databaseManage.js";

const getRoomDevices = asyncHandler(async (req, res, next) => {
  let roomID = req.params.id;
  let documents = await dbRead("Device", { room: roomID });
  if (documents.length < 1) throw new Error(`Can't find ${roomID} in Room`);
  res.status(200).json(documents);
});

const getRoomSchedules = asyncHandler(async (req, res, next) => {
  let roomID = req.params.id;
  let documents = await dbRead("Device", { room: roomID });
  if (documents.length < 1) throw new Error(`Can't find ${roomID} in Room`);
  res.status(200).json(documents);
});

export { getRoomDevices, getRoomSchedules };
