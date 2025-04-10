import express from "express";

// Should be be doing away with CORS?
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import superHeroRoutes from "./routes/superHeroRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import frontPageRoutes from "./routes/frontPageRoutes.js";
import cameraLocationRoutes from "./routes/cameraLocations.js";
import reactionsRoutes from './routes/reactionsRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173" })); // <-- Allow Vite dev server

app.use(express.json());

app.use("/superheroes", superHeroRoutes);
app.use("/cities", cityRoutes);

app.use("/login", authRoutes); // <-- Added this line of code to include the auth routes, Tony
app.use("/frontPage", frontPageRoutes); // <-- Added this line of code to include the frontPage routes, Tony

// app.use('/cameras', frontPageRoutes);
// app.use()
app.use("/cameralocations", cameraLocationRoutes);
app.use('/reactions', reactionsRoutes);

const server = app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
