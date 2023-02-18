import express from "express";
import { getAllYolov5, getYolov5, addYolov5 } from "../controllers/yolov5.js";
const router = express.Router();

// Get all yolov5
/*
  REQUEST GET: /api/v1/yolov5
  RESPONSE: [ { subscribe: '', public: '' } ]
*/
router.route("/").get(getAllYolov5);

// Get yolov5 topics, this way the topics is synchronized between relationships
/*
  REQUEST GET: /api/v1/yolov5/{roomName: <string>}
  RESPONSE: [ { subscribe: '', public: '' } ]
*/
router.route("/:id").get(getYolov5);

// Init yolov5 information to database
/*
  REQUEST POST: /api/v1/yolov5/
  {
    subscribe: <string>,
    public: <string>,
    room: <string>,
  }
  RESPONSE: { success: true }
*/
router.route("/").post(addYolov5);

export { router };
