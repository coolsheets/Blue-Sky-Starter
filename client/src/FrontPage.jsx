import { useState, useEffect } from "react";
import "./FrontPage.css";

const API_URL = "http://localhost:3000/superheroes";

function CityCameras() {
  const [heroes, setHeroes] = useState([]);

  // Fetch superheroes from the backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setHeroes)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <nav className="navbar">
        <h1>Blue Sky City Watcher</h1>
      </nav>
      <div className="gallery">
        {heroes.slice(0, 10).map((hero) => (
          <div key={hero._id} className="gallery-item">
            <img 
              src={hero.name}  
              alt={hero.name} 
              onError={(e) => e.target.src = "/images/default.jpg"} // Fallback image
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityCameras;