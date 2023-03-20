import express from "express";
import { validateToken } from "../middleware/jwt.js";
import {
  login,
  checkUserEmail,
  sentToken,
  checkToken,
  passwordChange,
} from "../controllers/user.js";

const router = express.Router();

router.route("/").post(login);

router.route("/checkemail").post(checkUserEmail);
router.route("/token").post(sentToken);
router.route("/validate").post(checkToken);

router.use(validateToken);
router.route("/change").post(passwordChange);

export { router };
