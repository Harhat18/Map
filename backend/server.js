import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PointSchema = new mongoose.Schema({
  Id: Number,
  lat: String,
  lng: String,
  datetime: {
    type: Date,
    default: () => new Date(Date.now() + 3 * 60 * 60 * 1000), // UTC+3
  },
});

const Point = mongoose.model("Point", PointSchema);

app.get("/api/points", async (req, res) => {
  const points = await Point.find();
  res.status(200).json(points);
});

app.post("/api/points", async (req, res) => {
  const { Id, lat, lng, datetime } = req.body;
  const point = new Point({ Id, lat, lng, datetime });
  await point.save();
  res.status(201).json(point);
});

// app.delete("/api/points/:id", async (req, res) => {
//   try {
//     const deletedPoint = await Point.findByIdAndDelete(req.params.id);
//     if (!deletedPoint) {
//       return res.status(404).json({ message: "Point not found" });
//     }
//     res.status(200).json({ message: "Point deleted", point: deletedPoint });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting point", error: error.message });
//   }
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});
