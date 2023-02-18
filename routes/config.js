import express from "express";
import {
  getAllConfig,
  getDeviceConfig,
  addDeviceConfig,
} from "../controllers/config.js";
const router = express.Router();

// Get all config
/*
  REQUEST GET: /api/v1/config/
  RESPONSE:
  [
    { room: <string>, loopTime: <int> }
  ]
*/
router.route("/").get(getAllConfig);

// Get config of one specific device
/*
  REQUEST GET: /api/v1/config/{roomName: <string>}
  RESPONSE:
  [
    { room: <string>, loopTime: <int> }
  ]
*/
router.route("/:id").get(getDeviceConfig);

// Add config of a specific device to database
/*
  REQUEST POST: /api/v1/config/
  {
    room: <string>,
    loopTime: <string>,
  }
  RESPONSE: {success: true}
*/
router.route("/").post(addDeviceConfig);

export { router };
