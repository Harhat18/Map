import { Point } from "../models/Points.js";

export const getPoints = async (req, res, next) => {
  const points = await Point.find();
  res.status(200).json(points);
};

export const postPoint = async (req, res) => {
  const { Id, lat, lng, datetime } = req.body;
  const point = new Point({ Id, lat, lng, datetime });
  await point.save();
  res.status(201).json(point);
};

export const deletePoint = async (req, res) => {
  try {
    const deletedPoint = await Point.findByIdAndDelete(req.params.id);
    if (!deletedPoint) {
      return res.status(404).json({ message: "Point not found" });
    }
    res.status(200).json({ message: "Point deleted", point: deletedPoint });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting point", error: error.message });
  }
};
