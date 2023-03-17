import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead } from "../utils/databaseManage.js";
import { generateToken } from "../middleware/jwt.js";

const login = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Users", { email: req.body.email });
  if (documents.length < 1) throw new Error("Invalid email || password");
  if (documents[0].password !== req.body.password)
    throw new Error("Invalid email || password");
  res.setHeader("auth", generateToken({data: "data"}, 3000));
  res.status(200).json({
    success: true,
    info: {
      name: documents[0].name,
      phone: documents[0].phone,
      address: documents[0].address,
    },
  });
});

export { login };
