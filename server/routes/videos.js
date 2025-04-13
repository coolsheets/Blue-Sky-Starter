import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findCameraLocationByName } from '../models/cameralocations.js'; // Import the new function

const router = express.Router();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', async (req, res) => {
  try {
    // Get video files from the videos folder
    const videoDir = path.join(__dirname, '../../client/public/videos');
    const files = fs.readdirSync(videoDir).filter(file => file.endsWith('.mp4'));

    // Fetch Camera_Location for each video
    const videoData = await Promise.all(
      files.map(async (file) => {
        // Extract the number from the filename and construct Camera_Name without padding
        const cameraNumber = file.split('_')[0]; // Extract the number part (e.g., "15" from "15_video_20250403.mp4")
        const cameraName = `Camera ${parseInt(cameraNumber, 10)}`; // Convert to integer to remove padding
        console.log('Extracted Camera_Name:', cameraName);

        // Query the database for the Camera_Location
        const cameraInfo = await findCameraLocationByName(cameraName);
        return {
          filename: file,
          location: cameraInfo ? cameraInfo.Camera_Location : 'Unknown Location', // Default to 'Unknown Location' if not found
        };
      })
    );

    res.json(videoData);
  } catch (error) {
    console.error('Error fetching video data:', error);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
});

router.get('/test', async (req, res) => {
  try {
    const cameraName = "Camera 30"; // Replace with a valid Camera_Name
    console.log("Testing query with Camera_Name:", cameraName);
    const cameraInfo = await findCameraLocationByName(cameraName);
    console.log("Query result:", cameraInfo);
    res.json(cameraInfo);
  } catch (error) {
    console.error('Error testing query:', error);
    res.status(500).json({ error: 'Failed to test query' });
  }
});

export default router;