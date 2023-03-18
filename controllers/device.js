import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbWrite } from "../utils/databaseManage.js";

const getDevice = asyncHandler(async (req, res, next) => {
  console.log("", req.headers["userid"]);
  let documents = await dbRead("Device", { deviceName: req.params.id });
  if (documents.length < 1)
    return res.status(200).json({ success: false, message: "Cant find ID" });
  res.status(200).json(documents[0]);
});

const addDevice = asyncHandler(async (req, res, next) => {
  console.log("", req.headers["userid"]);
  let documents = await dbRead("Device", { deviceName: req.body.deviceName });
  if (documents.length > 0)
    return res
      .status(200)
      .json({ success: false, message: "ID already exists" });
  await dbWrite("Device", req.body);
  res.status(200).json({ success: true });
});

export { getDevice, addDevice };
