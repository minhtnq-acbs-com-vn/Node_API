import express from "express";
import {
  getDeviceConfig,
  addDeviceConfig,
  updateDeviceConfig,
} from "../controllers/config.js";
const router = express.Router();

// Get config of one specific device
/*
  REQUEST GET: /api/v1/config/{deviceID}
  RESPONSE: 
  [
    { deviceID: '', room: '', loopTime: '' }
  ]
  */
router.route("/:id").get(getDeviceConfig);

// Add config of a specific device to database
/*
    REQUEST POST: /api/v1/config/{deviceID}
    [
      { deviceID: '', room: '', loopTime: '' }
    ]
    RESPONSE: {success: true}
    */
router.route("/:id").post(addDeviceConfig);

// Update config of a specific device to database
/*
    REQUEST PUT: /api/v1/config/{deviceID}
    [
      { deviceID: '', room: '', loopTime: '' }
    ]
    RESPONSE: {success: true}
    */
router.route("/:id").put(updateDeviceConfig);

export { router };
