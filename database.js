import { MongoClient } from "mongodb";

let dbInstance;

async function connectDatabase(uri) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    dbInstance = client.db("Iot");
  } catch (e) {
    console.error(e);
  }
}

const getDatabaseConnection = () => dbInstance;

export { connectDatabase, getDatabaseConnection };
