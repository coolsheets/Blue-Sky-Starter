import { useState, useEffect } from "react";
import "./FrontPage.css";

// Use your actual API endpoint for camera data
const API_URL = "http://localhost:3000/cameralocations"; // Or whatever route you're using

function CityCameras() {
  const [cameraLocations, setCameraLocations] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setCameraLocations)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <nav className="navbar">
        <h1>Blue Sky City Watcher</h1>
      </nav>
      <div className="gallery">
        {cameraLocations.slice(0, 10).map((camera) => (
          <div key={camera._id} className="gallery-item">
            <img
              src={camera.Camera_URL}
              alt={camera.Camera_Name}
              onError={(e) => (e.target.src = "/images/default.jpg")}
            />
            <p>{camera.Camera_Location}</p>
            <small>{camera.Quadrant}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityCameras;