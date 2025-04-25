import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Video from '../models/video.js';
import { findCameraLocationByName } from '../models/cameralocations.js';

const router = express.Router();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🟩 Route: Get all videos from MongoDB (for Gallery)
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ filename: 1 });
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos from DB:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// 🟦 Route: Get top 3 videos sorted by likes (for FrontPage)
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

router.put('/:filename/like', async (req, res) => {
  try {
    const { filename } = req.params;
    const video = await Video.findOneAndUpdate(
      { filename },
      { $inc: { 'stats.likes': 1 } },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    console.error("Error incrementing like:", error);
    res.status(500).json({ error: "Failed to update like" });
  }
});

// 🟨 Legacy (optional): Map local videos to camera locations — not used right now
router.get('/local-map', async (req, res) => {
  try {
    const videoDir = path.join(__dirname, '../../client/public/videos');
    const fs = await import('fs/promises');
    const files = (await fs.readdir(videoDir)).filter(file => file.endsWith('.mp4'));

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
    console.error('Error mapping local videos:', error);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
});

export default router;