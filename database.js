import { MongoClient } from "mongodb";

let databaseConn;

async function connectDatabase(uri) {
  const client = new MongoClient(uri);
  try {
    console.log("connect success");
    await client.connect();
    databaseConn = client.db("Iot");
  } catch (e) {
    console.error(e);
  }
}

const getDatabaseConnection = () => databaseConn;

export { connectDatabase, getDatabaseConnection };
