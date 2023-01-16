import { getDatabaseConnection } from "../database.js";

const getRoomDevices = async (req, res, next) => {
  let db = getDatabaseConnection();
  let roomID = req.params.id || "";
  let documentArr = [];
  await db
    .collection("Device")
    .find({ room: roomID })
    .forEach(document => {
      console.log(document);
      documentArr.push(document);
    });
  res.send(documentArr);
};
const getRoomSchedules = (req, res, next) => {};

export { getRoomDevices, getRoomSchedules };
