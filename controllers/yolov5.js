import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbWrite } from "../utils/databaseManage.js";

const getYolov5 = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Yolov5", { room: req.params.id });
  if (documents.length < 1) throw new Error(`Can't find it in room ${roomID}`);
  res.status(200).json(documents);
});

const addYolov5 = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Yolov5", { room: req.body.room });
  if (documents.length > 0) throw new Error("room already got yolov5");
  await dbWrite("Yolov5", req.body);
  res.status(200).json({ success: true });
});

export { getYolov5, addYolov5 };
