import express from "express";
import Driver from "../models/Driver.js";

const router = express.Router();

router.post("/location", async (req, res) => {
  const { driverId, lat, lng } = req.body;

  await Driver.findByIdAndUpdate(driverId, { lat, lng });

  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const drivers = await Driver.find({ available: true });
  res.json(drivers);
});

export default router;