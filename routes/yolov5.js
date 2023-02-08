import express from "express";
import { getYolov5 } from "../controllers/yolov5.js";
const router = express.Router();

// Get yolov5 topics, this way the topics is synchronized between relationships
/*
  REQUEST GET: /api/v1/yolov5/{roomName: <string>}
  RESPONSE: [ { subscribe: '', public: '' } ]
*/
router.route("/:id").get(getYolov5);

export { router };
