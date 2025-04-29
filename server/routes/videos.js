import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Video from '../models/video.js';
import { findAllCameraLocations } from '../models/cameralocations.js'; // Import your helper function

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper: extract camera number from filename
const extractCameraNumber = (filename) => {
  return parseInt(filename.split('.')[0], 10); // "001.mp4" -> 1
};

// 🟩 Route: Get all videos enriched with camera info
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ filename: 1 });
    const cameras = await findAllCameraLocations();

    const enrichedVideos = videos.map((video) => {
      const cameraNumber = extractCameraNumber(video.filename);

      const matchedCamera = cameras.find(cam => {
        return cam.Camera_Name?.toLowerCase() === `camera ${cameraNumber}`.toLowerCase();
      });

      return {
        filename: video.filename,
        stats: video.stats,
        camera_number: cameraNumber,
        camera_location: matchedCamera?.Camera_Location || "Unknown Location",
        quadrant: matchedCamera?.Quadrant || "Unknown Quadrant",
      };
    });

    res.json(enrichedVideos);
  } catch (error) {
    console.error("Error fetching enriched videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// 🟦 Route: Get top liked videos (no changes)
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

// 🟥 Serve static video file
router.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../../client/public/videos', req.params.filename);

  import('fs').then(fs => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`Video file not found: ${filePath}`);
        return res.status(404).json({ error: 'Video file not found' });
      }
      res.sendFile(filePath);
    });
  }).catch(error => {
    console.error('Error accessing video file:', error);
    res.status(500).json({ error: 'Failed to serve video file' });
  });
});

export default router;
