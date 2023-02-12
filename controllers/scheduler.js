import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead } from "../utils/databaseManage.js";

const getScheduler = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Scheduler");
  if (documents.length < 1) throw new Error(`Collection lost default document`);
  res.status(200).json(documents);
});

export { getScheduler };
