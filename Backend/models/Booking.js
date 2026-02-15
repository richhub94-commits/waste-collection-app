import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: String,
  driverId: String,

  binSize: String,
  price: Number,
  distanceKm: Number,

  paymentMethod: { 
    type: String, 
    enum: ["card", "momo", "cash"] 
  },

  paymentStatus: { 
    type: String, 
    default: "pending" 
  },

  photo: String,

  // Customer location
  location: {
    lat: Number,
    lng: Number
  },

  // ✅ Driver live location (added correctly here)
  driverLocation: {
    lat: Number,
    lng: Number
  },

  status: { 
    type: String, 
    default: "pending" 
  }

}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);