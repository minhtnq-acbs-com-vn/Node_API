import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbWrite } from "../utils/databaseManage.js";

const getAllYolov5 = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Yolov5", { userID: req.headers["userid"] });
  if (req.headers["userid"] === undefined) documents = await dbRead("Yolov5");
  if (documents.length < 1)
    throw new Error(`${req.headers["userid"]} don't have yolov5`);
  res.status(200).json(documents);
});

const getYolov5 = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Yolov5", {
    room: req.params.id,
    userID: req.headers["userid"],
  });
  if (documents.length < 1)
    throw new Error(`Can't find ${roomID} & ${req.headers["userid"]}`);
  res.status(200).json(documents);
});

const addYolov5 = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Yolov5", {
    room: req.body.room,
    userID: req.headers["userid"],
  });
  if (documents.length > 0)
    throw new Error(
      `Room ${req.body.room} of ${req.headers["userid"]} already got yolov5`
    );
  await dbWrite("Yolov5", req.body);
  res.status(200).json({ success: true });
});

export { getAllYolov5, getYolov5, addYolov5 };
