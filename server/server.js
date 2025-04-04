import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import superHeroRoutes from './routes/superHeroRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import cameraLocationRoutes from './routes/cameraLocations.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: 'http://localhost:5173' })); // <-- Allow Vite dev server

app.use(express.json());

app.use('/superheroes', superHeroRoutes);
app.use('/cities', cityRoutes);
app.use('/cameralocations', cameraLocationRoutes);

const server = app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})
