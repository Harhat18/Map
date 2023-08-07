import mongoose from "mongoose";
const PointSchema = new mongoose.Schema({
  Id: Number,
  lat: String,
  lng: String,
  datetime: {
    type: Date,
    default: () => new Date(Date.now()),
  },
});

PointSchema.pre("save", function (next) {
  this.datetime.setHours(this.datetime.getHours() + 3);
  next();
});

export const Point = mongoose.model("Point", PointSchema);
