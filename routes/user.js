import express from "express";
import { validateToken } from "../middleware/jwt.js";
import { login, passwordChange } from "../controllers/user.js";
const router = express.Router();

router.route("/").post(login);

router.use(validateToken);
router.route("/change").post(passwordChange);

export { router };
