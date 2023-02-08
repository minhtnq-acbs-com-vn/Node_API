import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbWrite } from "../utils/databaseManage.js";
import { validateYolov5 } from "../utils/validator.js";

const getYolov5 = asyncHandler(async (req, res, next) => {
  let roomID = req.params.id;
  let documents = await dbRead("Yolov5", { room: roomID });
  if (documents.length < 1) throw new Error(`Can't find it in room ${roomID}`);
  res.status(200).json(documents);
});

const addYolov5 = asyncHandler(async (req, res, next) => {
  const { error } = validateYolov5(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let yolov5Data = req.body;
  let roomID = yolov5Data.room;
  console.log(yolov5Data, roomID);
  let documents = await dbRead("Yolov5", { room: roomID });
  if (documents.length > 0)
    return res
      .status(200)
      .json({ success: false, message: "room already got yolov5" });
  await dbWrite("Yolov5", req.body);
  res.status(200).json({ success: true });
});

export { getYolov5, addYolov5 };
