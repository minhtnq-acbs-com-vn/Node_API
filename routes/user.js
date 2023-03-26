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
// post đến endpoint này để kiểm tra email có tồn tại
// yêu cầu gửi { email: email }
// trả về { success: true }
router.route("/checkemail").post(checkUserEmail);

// post đến endpoint này để gửi token đến email đã tồn tại 
// yêu cầu gửi { email: email }
// trả về { success: true }
router.route("/token").post(sentToken);

// post đến endpoint này để kiểm tra token người dùng nhập vào
// yêu cầu gửi { email: email, token: token } (email lấy từ token ở trên)
// trả về { success: true } kèm với header auth + userid nếu nhập đúng token
router.route("/validate").post(checkToken);

router.use(validateToken);
// post đến endpoint này để đổi password
// cả 2 trường hợp quên password và thay đổi password khi đã login vào app đều yêu cầu header auth + userid khi request
// Trường hợp quên password: sau khi check token thành công, sẽ có 2 header auth + userid
// Trường hợp đổi password khi đã login vào app: sẽ có header auth + userid từ server trả xuống nếu đăng nhập thành công
router.route("/change").post(passwordChange);

export { router };
