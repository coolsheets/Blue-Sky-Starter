import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/auth.js";
import superHeroRoutes from "./routes/superHeroRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import frontPageRoutes from "./routes/frontPageRoutes.js";
import cameraLocationRoutes from "./routes/cameraLocations.js";
import reactionsRoutes from './routes/reactionsRoutes.js';
import videosRoute from './routes/videos.js'; // <-- Make sure this path matches your file name


// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Mount your routes
app.use("/users", userRoutes);
app.use("/superheroes", superHeroRoutes);
app.use("/cities", cityRoutes);

// Use the videos route
app.use('/api/videos', videosRoute);
app.use('/api/reactions', reactionsRoutes); // <-- Added this line of code to include the reactions routes, Tony

// Serve React build
// app.use(express.static(path.join(__dirname, '../client/dist')));
// app.use(express.static(path.join(__dirname, '../client/public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
