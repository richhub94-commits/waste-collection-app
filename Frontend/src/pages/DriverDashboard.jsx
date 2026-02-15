import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { socket } from "../socket";
import axios from "axios";

export default function DriverDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    socket.on("receiveBooking", (booking) => {
      setJobs(prev => [...prev, booking]);
    });
  }, []);

  const acceptJob = (job) => {
    socket.emit("acceptBooking", job);
    alert("Job accepted!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Driver Dashboard</h1>

      {jobs.map(job => (
        <div key={job._id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>New Job</h3>
          <p>Bin: {job.binSize}L</p>
          <img
            src={`http://localhost:5000/${job.photo}`}
            width={150}
            alt="bin"
          />

          <MapContainer
            center={[job.location.lat, job.location.lng]}
            zoom={13}
            style={{ height: 200 }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[job.location.lat, job.location.lng]} />
          </MapContainer>

          <button onClick={() => acceptJob(job)}>Accept</button>
        </div>
      ))}
    </div>
  );
}