import express from "express";
import { pushNoti } from "../controllers/firebase.js";

const router = express.Router();

router.route("/").post(pushNoti);

export { router };
