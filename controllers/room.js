import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead } from "../utils/databaseManage.js";

const getRoomDevices = asyncHandler(async (req, res, next) => {
  let roomID = req.params.id;
  let documents = await dbRead("Device", { room: roomID });
  if (documents.length > 0) return res.status(200).json(documents);
  throw new Error(`ID:${roomID} not in Room collection`);
});

const getRoomSchedules = asyncHandler(async (req, res, next) => {
  let roomID = req.params.id;
  let documents = await dbRead("Device", { room: roomID });
  if (documents.length > 0) return res.status(200).json(documents);
  throw new Error(`ID:${roomID} not in Room collection`);
});

export { getRoomDevices, getRoomSchedules };
