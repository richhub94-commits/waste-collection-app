import express from "express";
import Booking from "../models/Booking.js";
import multer from "multer";
import { getDistance } from "geolib";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("binPhoto"), async (req, res) => {
  const { userLat, userLng, binSize, paymentMethod } = req.body;

  const baseLocation = { latitude: 5.6037, longitude: -0.1870 }; // Accra center
  const userLocation = { latitude: userLat, longitude: userLng };

  const distanceMeters = getDistance(baseLocation, userLocation);
  const distanceKm = distanceMeters / 1000;
  const price = distanceKm * 5; // GHC 5 per km

  const newBooking = new Booking({
    userId: req.body.userId,
    binSize,
    distanceKm,
    price,
    paymentMethod,
    photo: req.file?.path,
    location: { lat: userLat, lng: userLng }
  });

  await newBooking.save();
  res.json(newBooking);
});

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

export default router;