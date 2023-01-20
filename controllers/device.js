import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbWrite } from "../utils/databaseManage.js";
import { validateDevice } from "../utils/validator.js";

const getDevice = asyncHandler(async (req, res, next) => {
  let deviceID = req.params.id;
  let documents = await dbRead("Device", { deviceName: deviceID });
  if (documents.length < 1)
    return res.status(200).json({ success: false, message: "Cant find ID" });
  res.status(200).json(documents[0]);
});

const addDevice = asyncHandler(async (req, res, next) => {
  const { error } = validateDevice(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let deviceData = req.body;
  let deviceID = deviceData.deviceName;
  let documents = await dbRead("Device", { deviceName: deviceID });
  if (documents.length > 0)
    return res
      .status(200)
      .json({ success: false, message: "ID already exists" });
  await dbWrite("Device", req.body);
  res.status(200).json({ success: true });
});

export { getDevice, addDevice };
