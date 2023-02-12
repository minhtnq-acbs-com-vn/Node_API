import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbWrite, dbUpdate } from "../utils/databaseManage.js";
import {
  validateCreateConfig,
  validateUpdateConfig,
} from "../utils/validator.js";

const getDeviceConfig = asyncHandler(async (req, res, next) => {
  let deviceName = req.params.id;
  let documents = await dbRead("Config", { deviceName: deviceName });
  if (documents.length < 1)
    throw new Error(`Can't find ${deviceName} in Config`);
  res.status(200).json(documents);
});

const addDeviceConfig = asyncHandler(async (req, res, next) => {
  const { error } = validateCreateConfig(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let deviceName = req.body.deviceName;
  let documents = await dbRead("Config", { deviceName: deviceName });
  if (documents.length > 0) throw new Error(`ID:${deviceName} already exists`);
  let result = await dbWrite("Config", req.body);
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

const updateDeviceConfig = asyncHandler(async (req, res, next) => {
  const { error } = validateUpdateConfig(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let deviceName = req.params.id;
  let loopTime = req.body.loopTime;
  let request = req.body.request;
  let documents = await dbRead("Config", { deviceName: deviceName });
  if (documents.length < 1) throw new Error(`ID:${deviceName} dont exists`);
  let result = await dbUpdate(
    "Config",
    { loopTime: loopTime },
    { request: request }
  );
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

export { getDeviceConfig, addDeviceConfig, updateDeviceConfig };
