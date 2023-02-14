import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbWrite, dbDelete } from "../utils/databaseManage.js";
import { validateCreateConfig } from "../utils/validator.js";

const getDeviceConfig = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Config", { deviceName: req.params.id });
  if (documents.length < 1)
    throw new Error(`Can't find ${deviceName} in Config`);
  res.status(200).json(documents);
});

const addDeviceConfig = asyncHandler(async (req, res, next) => {
  const { error } = validateCreateConfig(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let documents = await dbRead("Config", { deviceName: req.body.deviceName });
  if (documents.length > 0) {
    let result = await dbDelete("Config", documents[0]["_id"]);
    if (result == null || result.deletedCount !== 1)
      throw new Error(`ID:${documents[0]["_id"]} is invalid to delete`);
  }
  let result = await dbWrite("Config", req.body);
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

export { getDeviceConfig, addDeviceConfig };
