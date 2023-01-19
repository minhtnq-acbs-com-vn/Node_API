import express from "express";
import { getMobile } from "../controllers/mobile.js";
const router = express.Router();

// Get mobile topics, this way the topics is synchronized between relationships
/*
  REQUEST GET: /api/v1/mobile
  RESPONSE: [ { _id: <string>, subscribe: <string>, public: <string> } ]
  */
router.route("/").get(getMobile);

export { router };
