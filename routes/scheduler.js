import express from "express";
import { getScheduler } from "../controllers/scheduler.js";
const router = express.Router();

// Get scheduler topics, this way the topics is synchronized between relationships
/*
  REQUEST GET: /api/v1/scheduler
  RESPONSE: [ { _id: '63bd16a33f437f2abf05319a', subscribe: '', public: '' } ]
*/
router.route("/").get(getScheduler);

export { router };
