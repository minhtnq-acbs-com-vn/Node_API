import crypto from "crypto";
import bcrypt, { hash } from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ObjectId } from "mongodb";
import { dbRead, dbUpdate } from "../utils/databaseManage.js";
import { generateToken } from "../middleware/jwt.js";
import {
  validateEmail,
  validateResetToken,
  validatePasswordChange,
} from "../utils/validator.js";
import { sentMail } from "./email.js";

const login = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Users", { email: req.body.email });
  if (documents.length < 1) throw new Error("Invalid email || password");
  let result = await bcrypt.compare(req.body.password, documents[0].password);
  if (!result) throw new Error("Invalid email || password");
  res.setHeader("auth", generateToken({ data: "data" }, 86400));
  res.header("userid", documents[0]._id);
  res.status(200).json({
    success: true,
    info: documents[0].address,
  });
});

const checkUserEmail = asyncHandler(async (req, res, next) => {
  const { error } = validateEmail(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let document = await dbRead("Users", {
    email: req.body.email,
  });
  if (document.length < 1) throw new Error(`${req.body.email} not exists`);
  res.status(200).json({ success: true });
});

const sentToken = asyncHandler(async (req, res, next) => {
  const { error } = validateEmail(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let resetToken = crypto.randomBytes(32).toString("hex");
  let hashed = await bcrypt.hash(resetToken, 10);
  if (!hashed) throw new Error("Failed to hash token");
  let { e, info } = await sentMail(
    req.body.email,
    "AEDSS Password Reset",
    `Your reset token is: ${resetToken}`
  );
  if (e !== undefined) throw new Error("Failed to sent mail");
  let result = await dbUpdate(
    "Users",
    { email: req.body.email },
    {
      token: hashed,
    }
  );
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

const checkToken = asyncHandler(async (req, res) => {
  const { error } = validateResetToken(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let document = await dbRead("Users", {
    email: req.body.email,
  });
  if (document.length < 1) throw new Error(`Invalid ${req.body.email}`);
  let result = await bcrypt.compare(req.body.token, document[0].token);
  if (!result) throw new Error("Invalid token");
  res.setHeader("auth", generateToken({ data: "data" }, 86400));
  res.header("userid", document[0]._id);
  res.status(200).json({ success: true });
});

const passwordChange = asyncHandler(async (req, res, next) => {
  const { error } = validatePasswordChange(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let document = await dbRead("Users", {
    _id: ObjectId(req.headers["userid"]),
  });
  if (document.length < 1) throw new Error(`Invalid ${req.headers["userid"]}`);
  const hashed = await bcrypt.hash(req.body.newPassword, 10);
  if (!hashed) throw new Error("Failed to hash pass");
  let result = await dbUpdate(
    "Users",
    { _id: ObjectId(req.headers["userid"]) },
    {
      password: hashed,
    }
  );
  if (result.acknowledged !== true)
    throw new Error("Something wrong with database");
  res.status(200).json({ success: true });
});

export { login, checkUserEmail, sentToken, checkToken, passwordChange };
