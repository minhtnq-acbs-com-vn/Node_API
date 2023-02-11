import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbWrite, dbUpdate } from "../utils/databaseManage.js";
import {
  validateCreateConfig,
  validateUpdateConfig,
} from "../utils/validator.js";

const getDeviceConfig = asyncHandler(async (req, res, next) => {
  let deviceID = req.params.id;
  let documents = await dbRead("Config", { deviceID: deviceID });
  if (documents.length < 1) throw new Error(`Can't find ${deviceID} in Config`);
  res.status(200).json({documents});
});

const addDeviceConfig = asyncHandler(async (req, res, next) => {
  const { error } = validateCreateConfig(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let deviceID = req.body.deviceID;
  let documents = await dbRead("Config", { deviceID: deviceID });
  if (documents.length > 0) throw new Error(`ID:${deviceID} already exists`);
  let result = await dbWrite("Config", req.body);
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

const updateDeviceConfig = asyncHandler(async (req, res, next) => {
  const { error } = validateUpdateConfig(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let deviceID = req.params.id;
  let loopTime = req.body.loopTime;
  let documents = await dbRead("Config", { deviceID: deviceID });
  if (documents.length < 1) throw new Error(`ID:${deviceID} dont exists`);
  let result = await dbUpdate(
    "Config",
    { deviceID: deviceID },
    { loopTime: loopTime }
  );
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

export { getDeviceConfig, addDeviceConfig, updateDeviceConfig };
