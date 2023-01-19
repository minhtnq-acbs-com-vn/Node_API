import express from "express";
import { getRoomDevices, getRoomSchedules } from "../controllers/room.js";
const router = express.Router();

// Get all devices that belongs to a specific room
/*
REQUEST GET: /api/v1/room/device/{roomName: <string>}
RESPONSE: 
[
  {
  _id: <string>,
  room: <string>,
  module: <string>,
  topic: { subscribe: <string>, ack: <string>, publish: <string>},
  ack: { {sensorName}: <string>, {sensorName}: <string>},
  request: { door: <string>, pir: <string>, api: <string>},
  }, etc,..
]
*/
router.route("/device/:id").get(getRoomDevices);

// Get all available schedule(s) belongs to a specific room
/*
REQUEST GET: /api/v1/room/schedules/{roomName: <string>}
RESPONSE: 
[
  {
    _id: <string>,
    deviceID: <string>,
    deviceModule: <string>,
    room: <string>,
    timeOn: <string>,
    timeOff: <string>,
    repeat: <string>
  }, etc,..
]
*/
router.route("/schedules/:id").get(getRoomSchedules);

export { router };
