import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { initializeApp, cert } from "firebase-admin/app";
import { connectDatabase } from "./database.js";
import { router as userRouter } from "./routes/user.js";
import { validateToken } from "./middleware/jwt.js";
import { router as configRouter } from "./routes/config.js";
import { router as deviceRouter } from "./routes/device.js";
import { router as roomRouter } from "./routes/room.js";
import { router as schedulerRouter } from "./routes/scheduler.js";
import { router as schedulesRouter } from "./routes/schedules.js";
import { router as yolov5Router } from "./routes/yolov5.js";
import { router as firebaseRouter } from "./routes/firebase.js";
import { errorHandler } from "./middleware/error.js";
dotenv.config({ path: "./config/config.env" });

initializeApp({
  credential: cert(JSON.parse(process.env.firebaseKey)),
});

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase(process.env.databasebURI).catch(console.error);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/firebase", firebaseRouter);

app.use(validateToken);

app.use("/api/v1/device", deviceRouter);
app.use("/api/v1/config", configRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/scheduler", schedulerRouter);
app.use("/api/v1/schedules", schedulesRouter);
app.use("/api/v1/yolov5", yolov5Router);

app.use(errorHandler);

app.use("*", (req, res) => {
  res.json({ message: "Invalid Route(s)" });
});

app.listen(process.env.port, () => {
  console.log("Server is running on: ", process.env.port);
});
