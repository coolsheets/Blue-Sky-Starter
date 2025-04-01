import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/superheroes";

function SuperheroRegistry() {
  const [hero, setHero] = useState({ name: "", powers: "", alias: "" });
  const [heroes, setHeroes] = useState([]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Superhero Registry</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={hero.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Superpowers:</label><br />
          <input
            type="text"
            name="powers"
            value={hero.powers}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Alias:</label><br />
          <input
            type="text"
            name="alias"
            value={hero.alias}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Register</button>
      </form>

      <h2>Registered Heroes</h2>
      <ul>
        {heroes.map((h) => (
          <li key={h.id}>
            <strong>{h.name}</strong> aka <em>{h.alias}</em> — Powers: {h.powers}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuperheroRegistry;