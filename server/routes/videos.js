import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Video from '../models/video.js';
import { findAllCameraLocations } from '../models/cameralocations.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// extract camera #
const extractCameraNumber = (filename) => parseInt(filename.split('.')[0], 10);

// GET all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ filename: 1 });
    const cameras = await findAllCameraLocations();

    const enriched = videos.map((video) => {
      const camNum = extractCameraNumber(video.filename);
      const match = cameras.find(cam => cam.Camera_Name?.toLowerCase() === `camera ${camNum}`.toLowerCase());
      return {
        filename: video.filename,
        stats: video.stats,
        camera_number: camNum,
        camera_location: match?.Camera_Location || "Unknown Location",
        quadrant: match?.Quadrant || "Unknown Quadrant",
      };
    });

    res.json(enriched);
  } catch (err) {
    console.error("Error fetching enriched videos:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// GET top liked videos
router.get('/top-liked', async (req, res) => {
  try {
    const top = await Video.find().sort({ 'stats.likes': -1 }).limit(3);
    res.json(top);
  } catch (err) {
    console.error('Error fetching top liked videos:', err);
    res.status(500).json({ error: 'Failed to fetch top liked videos' });
  }
});

// GET static video
router.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../../client/public/videos', req.params.filename);
  import('fs').then(fs => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) return res.status(404).json({ error: 'Video not found' });
      res.sendFile(filePath);
    });
  }).catch(err => {
    console.error('Error accessing video file:', err);
    res.status(500).json({ error: 'Failed to serve video' });
  });
});

// ✅ NEW: PUT /:filename/like (1 like per user)
router.put('/:filename/like', authenticateToken, async (req, res) => {
  const { filename } = req.params;
  const userId = req.user.userId;

  try {
    const video = await Video.findOne({ filename });
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (!video.likedBy) video.likedBy = [];

    const hasLiked = video.likedBy.includes(userId);

    if (hasLiked) {
      return res.status(400).json({ message: "User already liked this video" });
    }

    video.stats.likes = (video.stats.likes || 0) + 1;
    video.likedBy.push(userId);
    await video.save();

    res.json(video);
  } catch (err) {
    console.error("Failed to like video:", err);
    res.status(500).json({ message: 'Failed to like video' });
  }
});

export default router;
