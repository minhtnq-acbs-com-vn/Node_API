import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead } from "../utils/databaseManage.js";

const getDevice = asyncHandler(async (req, res, next) => {
  res.status(200).json("Got your id"); // Must have;
});

const addDevice = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  res.json({ success: true });
});

export { getDevice, addDevice };
