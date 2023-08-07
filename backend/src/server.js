import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { DB } from "./models/dbConnect.js";

import Point from "./routers/point.routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
DB();

app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/points", Point);

app.listen(process.env.PORT, () => {
  console.log(`Start server on ${port}`);
});
