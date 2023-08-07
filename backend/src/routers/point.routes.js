import express from "express";

import {
  getPoints,
  postPoint,
  deletePoint,
} from "../controller/point.controller.js";

const { Router } = express;
const router = Router();

router.route("/").get(getPoints);
router.route("/").post(postPoint);
router.route("/").post(deletePoint);

export default router;
