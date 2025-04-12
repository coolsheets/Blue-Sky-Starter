import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route to fetch video files
router.get('/', (req, res) => {
  const videoDir = path.join(__dirname, '../../client/public/videos'); // Adjust path if needed
  fs.readdir(videoDir, (err, files) => {
    if (err) {
      console.error('Error reading video directory:', err);
      return res.status(500).json({ error: 'Failed to load videos' });
    }
    const videoFiles = files.filter(file => file.endsWith('.mp4')); // Filter for .mp4 files
    console.log('Video files:', videoFiles); // Debugging
    res.json(videoFiles);
  });
});

export default router; // Default export