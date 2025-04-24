import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findCameraLocationByName } from '../models/cameralocations.js';
import Video from '../models/video.js'; // ✅ Import the Video model

const router = express.Router();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🟦 Default route: Get all video files and try to map them with location
router.get('/', async (req, res) => {
  try {
    const videoDir = path.join(__dirname, '../../client/public/videos');
    const files = fs.readdirSync(videoDir).filter(file => file.endsWith('.mp4'));

    const videoData = await Promise.all(
      files.map(async (file) => {
        const cameraNumber = file.split('_')[0];
        const cameraName = `Camera ${parseInt(cameraNumber, 10)}`;
        const cameraInfo = await findCameraLocationByName(cameraName);

        return {
          filename: file,
          location: cameraInfo ? cameraInfo.Camera_Location : 'Unknown Location',
        };
      })
    );

    res.json(videoData);
  } catch (error) {
    console.error('Error fetching video data:', error);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
});

// 🟨 New route: Get top 3 videos by likes from DB
router.get('/top-liked', async (req, res) => {
  try {
    const topVideos = await Video.find()
      .sort({ 'stats.likes': -1 })
      .limit(3);
    res.json(topVideos);
  } catch (error) {
    console.error('Error fetching top liked videos:', error);
    res.status(500).json({ error: 'Failed to fetch top liked videos' });
  }
});

export default router;