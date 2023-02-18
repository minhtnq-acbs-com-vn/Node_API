import express from "express";
import {
  getAllSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedules.js";
const router = express.Router();

// Get all schedule
/*
  REQUEST GET: /api/v1/schedule/
  RESPONSE:
  [
    { room: <string>, loopTime: <int> }
  ]
*/
router.route("/").get(getAllSchedule);

// Add schedule to database
/*
  REQUEST POST: /api/v1/schedules
  {
    deviceName: <string>,
    deviceModule: <string>,
    room: <string>,
    timeOn: <string>,
    timeOff: <string>,
    repeat: <string>,
    dayOfTheWeek: <string>,
    request: <string>,
  }
  RESPONSE: {success: true}
*/
router.route("/").post(addSchedule);

// Update schedule to database
/*
  REQUEST PUT: /api/v1/schedules/{scheduleID: <string>}
  {
    timeOn: <string>,
    timeOff: <string>,
    repeat: <string>,
    dayOfTheWeek: <string>,
    request: <string>,
  }
  RESPONSE: {success: true}
*/
router.route("/:id").put(updateSchedule);

// Delete schedule from database
/*
  REQUEST DELETE: /api/v1/schedules/{scheduleID: <string>}
  RESPONSE: {success: true}
*/
router.route("/:id").delete(deleteSchedule);

export { router };
