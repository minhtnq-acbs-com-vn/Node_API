import { asyncHandler } from "../utils/asyncHandler.js";
import { dbRead } from "../utils/databaseManage.js";

const getMobile = asyncHandler(async (req, res, next) => {
  let documents = await dbRead("Mobile");
  if (documents.length < 1) throw new Error(`Collection lost default document`);
  return res.status(200).json(documents);
});

export { getMobile };
