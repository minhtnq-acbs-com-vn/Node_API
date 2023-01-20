import { ObjectId } from "mongodb";
import { getDatabaseConnection } from "../database.js";

const dbRead = async (collection, key = null) => {
  let db = await getDatabaseConnection();
  let documentArr = [];
  await db
    .collection(collection)
    .find(key)
    .forEach(document => {
      documentArr.push(document);
    });
  return documentArr;
};

const dbWrite = async (collection, obj) => {
  let db = await getDatabaseConnection();
  let result = await db.collection(collection).insertOne(obj);
  return result;
};

const dbUpdate = async (collection, filter, updated) => {
  let db = await getDatabaseConnection();
  let result = await db
    .collection(collection)
    .updateOne(filter, { $set: updated });
  return result;
};

const dbDelete = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  let db = await getDatabaseConnection();
  let result = await db.collection(collection).deleteOne({ _id: ObjectId(id) });
  return result;
};

export { dbRead, dbWrite, dbUpdate, dbDelete };
