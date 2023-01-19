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
  let result = await db.collection(collection).updateOne(filter, {$set:updated});
  return result;
};

export { dbRead, dbWrite, dbUpdate };
