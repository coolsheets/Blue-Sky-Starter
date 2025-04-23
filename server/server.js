import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import videosRoute from './routes/videos.js'; // Adjust the path if necessary

// Should we be doing away with CORS?
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import superHeroRoutes from "./routes/superHeroRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import frontPageRoutes from "./routes/frontPageRoutes.js";
import cameraLocationRoutes from "./routes/cameraLocations.js";
import reactionsRoutes from './routes/reactionsRoutes.js';
import userRoutes from './routes/userRoutes.js'; // <-- Added this line of code to include the user routes, Tony


// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173" })); // <-- Allow Vite dev server

app.use(express.json());

app.use("/superheroes", superHeroRoutes);
app.use("/cities", cityRoutes);

// Use the videos route
app.use('/api/videos', videosRoute);
app.use('/api/reactions', reactionsRoutes); // <-- Added this line of code to include the reactions routes, Tony

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../client/public')));



app.use("/login", authRoutes); // <-- Added this line of code to include the auth routes, Tony
app.use("/frontPage", frontPageRoutes); // <-- Added this line of code to include the frontPage routes, Tony

app.use("/user",userRoutes); // <-- Added this line of code to include the user routes, Tony

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
