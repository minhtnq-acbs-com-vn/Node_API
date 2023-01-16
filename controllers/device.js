import { getDatabaseConnection } from "../database.js";

const getDevice = (req, res, next) => {
  res.status(200).json("Got your id");
}; // Must have;
const addDevice = (req, res, next) => {
  console.log(req.body);
  res.json({ success: true });
};

export { getDevice, addDevice };
