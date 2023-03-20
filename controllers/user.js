import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead, dbUpdate } from "../utils/databaseManage.js";
import { generateToken } from "../middleware/jwt.js";
import { validatePasswordChange } from "../utils/validator.js";
import { hashPass } from "./hash.js";
import { ObjectId } from "mongodb";

const login = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Users", { email: req.body.email });
  if (documents.length < 1) throw new Error("Invalid email || password");
  let result = await bcrypt.compare(req.body.password, documents[0].password);
  if (!result) throw new Error("Invalid email || password");
  res.setHeader("auth", generateToken({ data: "data" }, 86400));
  res.header("userid", documents[0]._id);
  res.status(200).json({
    success: true,
    info: {
      name: documents[0].name,
      phone: documents[0].phone,
      address: documents[0].address,
    },
  });
});

const passwordChange = asyncHandler(async (req, res, next) => {
  const { error } = validatePasswordChange(req.body);
  if (error) throw new Error(`${error.details[0].message}`);
  let document = await dbRead("Users", {
    _id: ObjectId(req.headers["userid"]),
  });
  if (document.length < 1) throw new Error(`Invalid ${req.headers["userid"]}`);
  let hashed = hashPass(req.body.newPassword);
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

export { login, passwordChange };
