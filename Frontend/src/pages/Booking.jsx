import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../socket";
import "leaflet/dist/leaflet.css";

function ClickMap({ setPos }) {
  useMapEvents({
    click(e) {
      setPos([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
}

export default function Booking() {
  const [pos, setPos] = useState([5.6037, -0.1870]);
  const [binSize, setBinSize] = useState("360");
  const [photo, setPhoto] = useState(null);
  const [payment, setPayment] = useState("card");
  const [drivers, setDrivers] = useState([]);

  // Get nearby drivers
  useEffect(() => {
    axios.get("http://localhost:5000/api/drivers").then(res => {
      setDrivers(res.data);
    });

    socket.on("driverLocationUpdated", (data) => {
      setDrivers(prev =>
        prev.map(d =>
          d._id === data.driverId ? { ...d, lat: data.lat, lng: data.lng } : d
        )
      );
    });
  }, []);

  const distanceKm = Math.random() * 10 + 1;
  const price = (distanceKm * 5).toFixed(2);

  const submit = async () => {
    const form = new FormData();
    form.append("userLat", pos[0]);
    form.append("userLng", pos[1]);
    form.append("binSize", binSize);
    form.append("paymentMethod", payment);
    form.append("binPhoto", photo);

    const res = await axios.post("http://localhost:5000/api/bookings", form);

    socket.emit("newBooking", res.data);
    alert("Booking sent to nearby drivers!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Pickup (Live Map)</h2>

      <MapContainer center={pos} zoom={12} style={{ height: 350 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pos} />
        <ClickMap setPos={setPos} />

        {drivers.map(d => (
          <Marker key={d._id} position={[d.lat, d.lng]} />
        ))}
      </MapContainer>

      <h3>Select Bin</h3>
      <select onChange={e => setBinSize(e.target.value)}>
        <option value="140">140L</option>
        <option value="240">240L</option>
        <option value="360">360L</option>
        <option value="770">770L</option>
        <option value="1100">1100L</option>
      </select>

      <h3>Upload bin photo</h3>
      <input type="file" onChange={e => setPhoto(e.target.files[0])} />

      <h3>Distance: {distanceKm.toFixed(2)} km</h3>
      <h3>Price: GHC {price}</h3>

      <h3>Payment</h3>
      <select onChange={e => setPayment(e.target.value)}>
        <option value="card">Paystack Card</option>
        <option value="momo">Mobile Money</option>
        <option value="cash">Cash on Pickup</option>
      </select>

      <button onClick={submit}>Submit Booking</button>
    </div>
  );
}