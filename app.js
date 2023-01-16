import express from "express";
import dotenv from "dotenv";
import { connectDatabase, getDatabaseConnection } from "./database.js";
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let databaseClient;

await connectDatabase(process.env.databasebURI);
databaseClient = await getDatabaseConnection();

// Get all devices that belongs to a specific room
/*
REQUEST GET: /api/v1/room/{roomName}
RESPONSE: 
[
  {
  _id: <string>,
  room: <string>,
  module: <string>,
  topic: { subscribe: <string>, ack: <string>, publish: <string>},
  ack: { {sensorName}: <string>, {sensorName}: <string>},
  request: { door: <string>, pir: <string>, api: <string>},
  }, etc,..
]
*/
app.get("/api/v1/room/:id", async (req, res) => {
  let roomID = req.params.id || "";
  let documentArr = [];
  await databaseClient
    .collection("Device")
    .find({ room: roomID })
    .forEach(document => {
      console.log(document);
      documentArr.push(document);
    });
  res.send(documentArr);
});

// Get all available schedule(s) belongs to a specific room
/*
REQUEST GET: /api/v1/schedules/{roomName}
RESPONSE: 
[
  {
    _id: <string>,
    deviceID: <string>,
    deviceModule: <string>,
    room: <string>,
    timeOn: <string>,
    timeOff: <string>,
    repeat: <string>
  }, etc,..
]
*/
app.get("/api/v1/schedules/:id", (req, res) => {});

// Add schedule to database
/*
REQUEST POST: /api/v1/schedules
[
  {
    deviceID: <string>,
    deviceModule: <string>,
    room: <string>,
    timeOn: <string>,
    timeOff: <string>,
    repeat: <string>
  }
]
RESPONSE: {success: true}
*/
app.post("/api/v1/schedules", (req, res) => {});

// Update schedule to database
/*
REQUEST PUT: /api/v1/schedules/{scheduleID}
[
  {
    _id: <string>,
    deviceID: <string>,
    deviceModule: <string>,
    room: <string>,
    timeOn: <string>,
    timeOff: <string>,
    repeat: <string>
  }
]
RESPONSE: {success: true}
*/
app.put("/api/v1/schedules/:id", (req, res) => {});

// Delete schedule from database
/*
REQUEST DELETE: /api/v1/schedules/{scheduleID}
[
  {
    _id: <string>,
    deviceID: <string>,
    deviceModule: <string>,
    room: <string>,
    timeOn: <string>,
    timeOff: <string>,
    repeat: <string>
  }
]
RESPONSE: {success: true}
*/
app.delete("/api/v1/schedules/:id", (req, res) => {});

// Get config of one specific device
/*
REQUEST GET: /api/v1/config/{deviceID}
RESPONSE: 
[
  { deviceID: '', room: '', loopTime: '' }
]
*/
app.get("/api/v1/config/:id", (req, res) => {});

// Add config of a specific device to database
/*
REQUEST POST: /api/v1/config/{deviceID}
[
  { deviceID: '', room: '', loopTime: '' }
]
RESPONSE: {success: true}
*/
app.post("/api/v1/config/:id", (req, res) => {});

// Update config of a specific device to database
/*
REQUEST PUT: /api/v1/config/{deviceID}
[
  { deviceID: '', room: '', loopTime: '' }
]
RESPONSE: {success: true}
*/
app.put("/api/v1/config/:id", (req, res) => {});

// Get all config from a specific device
// If can't find it || If can find it response its config back
// Means that device yet to have a config, auto config
// Set to database then sent the config back as a response
/*
REQUEST GET: /api/v1/device/{deviceID}:{roomName}:{module}
RESPONSE: 
{
  "ack": { "door": " ", "pir": "" },
  "request": { "door": "", "pir": "", "api": "" },
  "pin": { "door": "", "pir":  ""}
}
*/
app.get("/api/v1/device/:id", (req, res) => {
  res.status(200).json("Got your id"); // Must have
});

// Init device information to database (not found device config use case)
/*
REQUEST POST: /api/v1/device/
{
  roomName: <string>,
  deviceModule:  <string>,
  topic: [  <string>,  <string>,  <string> ],
  ack: [  <string>,  <string> ],
  request: [  <string>,  <string>,  <string> ],
  pin: [<int>, <int>]
}
RESPONSE: { success: true }
*/
app.post("/api/v1/device/", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

// Get mobile topics, this way the topics is synchronized between relationships
/*
REQUEST GET: /api/v1/mobile
RESPONSE: [ { _id: '63bd16a33f437f2abf05319a', subscribe: '', public: '' } ]
*/
app.get("/api/v1/mobile", (req, res) => {});

// Same for scheduler
/*
REQUEST GET: /api/v1/scheduler
RESPONSE: [ { _id: '63bd16a33f437f2abf05319a', subscribe: '', public: '' } ]
*/
app.get("/api/v1/scheduler", (req, res) => {});

app.listen(process.env.port, () => {
  console.log("Server is running on: ", process.env.port);
});
