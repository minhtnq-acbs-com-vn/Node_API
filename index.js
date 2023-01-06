import express from "express";
import { config } from "dotenv";

config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server run on ${process.env.NODE_ENV} port ${process.env.PORT}`)
);
