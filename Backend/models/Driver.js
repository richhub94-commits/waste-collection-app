import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  vehicle: String,
  lat: Number,
  lng: Number,
  available: { type: Boolean, default: true },
  approved: { type: Boolean, default: false }
});

export default mongoose.model("Driver", DriverSchema);