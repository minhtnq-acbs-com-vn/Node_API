import express from "express";
import { getDevice, addDevice } from "../controllers/device.js";
const router = express.Router();

// Get all config from a specific device
// If can't find it || If can find it response its config back
// Means that device yet to have a config, auto config
// Set to database then sent the config back as a response
/*
  REQUEST GET: /api/v1/device/{deviceID: <string>}:{roomName: <string>}:{module: <string>}
  RESPONSE: 
  {
    "ack": { "door": " ", "pir": "" },
    "request": { "door": "", "pir": "", "api": "" },
    "pin": { "door": "", "pir":  ""}
  }
*/
router.route("/:id").get(getDevice);

// Init device information to database (not found device config use case)
/*
  REQUEST POST: /api/v1/device/
  {
    roomName: <string>,
    deviceModule:  <string>,
    topic: [  <string>,  <string>,  <string> ],
    ack: [  <string>,  <string> ],
    request: [  <string>,  <string>,  <string> ],
    pin: [<int>, <int>]
  }
  RESPONSE: { success: true }
*/
router.route("/").post(addDevice);

export { router };
