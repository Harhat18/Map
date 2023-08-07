import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import Point from "./routers/point.routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/points", Point);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Start server on ${port}`);
});
