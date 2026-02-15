import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import axios from "axios";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings").then(res => {
      setBookings(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Live Map</h1>

      <MapContainer center={[5.6037, -0.1870]} zoom={10} style={{ height: 400 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {bookings.map(b => (
          <Marker key={b._id} position={[b.location.lat, b.location.lng]} />
        ))}
      </MapContainer>

      <h2>All Bookings</h2>
      {bookings.map(b => (
        <div key={b._id} style={{ border: "1px solid gray", padding: 10 }}>
          <p>Bin: {b.binSize}L</p>
          <p>Price: GHC {b.price}</p>
          <img
            src={`http://localhost:5000/${b.photo}`}
            width={120}
            alt="bin"
          />
        </div>
      ))}
    </div>
  );
}