import express from "express";
import https from "https";
import dotenv from "dotenv";
import { options } from "./config/sslOptions.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all devices but only list out distinct room(s)
app.get("/api/v1/rooms", (req, res) => {});

// Get all devices that belongs to a specific room
app.get("/api/v1/room/:id", (req, res) => {});

// Get all available schedule(s)
app.get("/api/v1/schedules", (req, res) => {});

// Get detail of one specific schedule
app.get("/api/v1/schedule/:id", (req, res) => {});

// Add schedule to database
app.post("/api/v1/schedules", (req, res) => {});

// Get config of one specific device
app.get("/api/v1/config/:id", (req, res) => {});

// Add config of a specific device to database
app.post("/api/v1/config/:id", (req, res) => {});

// Update config of a specific device to database
app.put("/api/v1/config/:id", (req, res) => {});

// Get all config from a specific device
// If can't find it
// Means that device yet to have a config, auto config it and set to database then sent the config back as a response
app.get("/api/v1/device/:id", (req, res) => {});

// Get mobile topics, this way the topics is synchronized between relationships
app.get("/api/v1/mobile", (req, res) => {});

// Same for scheduler
app.get("/api/v1/scheduler", (req, res) => {});

let server = https.createServer(options, app);

server.listen(process.env.port, () => {
  console.log("server starting on port : " + process.env.port);
});
