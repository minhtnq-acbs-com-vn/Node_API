import express from "express";
import { getDeviceConfig, addDeviceConfig } from "../controllers/config.js";
const router = express.Router();

// Get config of one specific device
/*
  REQUEST GET: /api/v1/config/{deviceName: <string>}
  RESPONSE:
  [
    { deviceName: <string>, room: <string>, loopTime: <int> }
  ]
*/
router.route("/:id").get(getDeviceConfig);

// Add config of a specific device to database
/*
  REQUEST POST: /api/v1/config/
  {
    deviceName: <string>,
    room: <string>,
    loopTime: <string>,
    request: <string>,
  }
  RESPONSE: {success: true}
*/
router.route("/").post(addDeviceConfig);

export { router };
