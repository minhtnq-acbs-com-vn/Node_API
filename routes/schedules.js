import express from "express";
import {
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedules.js";
const router = express.Router();

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
