// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App"; // import the new App component

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);