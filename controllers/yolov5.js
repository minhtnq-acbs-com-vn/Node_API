import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead } from "../utils/databaseManage.js";

const getYolov5 = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Yolov5");
  if (documents.length < 1) throw new Error(`Collection lost default document`);
  res.status(200).json(documents);
});

export { getYolov5 };
