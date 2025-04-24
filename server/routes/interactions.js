import express from "express";
import fs from "fs";
import path from "path";
import {
  recordInteraction,
  updateVideoStats,
  getTopRatedVideos,
} from "./controllers/interactionsController.js";

const router = express.Router();

// const videosFolder = '/home/mfretwell/Documents/InceptionU/projects/Blue-Sky-Starter/client/public/videos'; // Path to the videos folder

const videosFolder =
  "../..client/public/videos"; // Change the Path to the videos folder for local testing
// const videosFolder = path.join(__dirname, '../public/videos'); // Path to the videos folder

// Endpoint to fetch video metadata
router.get("/videos", (req, res) => {
  fs.readdir(videosFolder, (err, files) => {
    if (err) {
      console.error("Error reading videos folder:", err);
      return res.status(500).json({ error: "Failed to fetch videos" });
    }

    const videos = files.map((file) => ({
      name: file,
      url: `http://localhost:5000/videos/${file}`, // Public URL for the video
    }));

    res.json(videos);
  });
});

// Serve video files statically
router.use("/videos", express.static(videosFolder));

// Endpoint to serve a specific video file
router.get("/videos/:filename", (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(videosFolder, filename);

  // Check if the file exists
  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Video not found:", videoPath);
      return res.status(404).json({ error: "Video not found" });
    }

    // Serve the video file
    res.sendFile(videoPath);
  });
});

router.post("/interact", async (req, res) => {
  const { userId, videoId, liked, rating, comment } = req.body;
  try {
    const interaction = await Interaction.findOneAndUpdate(
      { userId, videoId },
      { liked, rating, comment },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(interaction);
  } catch (err) {
    console.error("Error saving interaction:", err);
    res.status(500).json({ error: "Failed to save interaction" });
  }
});

router.get("/top-rated", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const videos = await getTopRatedVideos(limit);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top rated videos" });
  }
});

// Get all interactions for a user
router.get("/interactions/:userId", async (req, res) => {
  try {
    const interactions = await Interaction.find({ userId: req.params.userId });
    res.json(interactions);
  } catch (err) {
    console.error("Error fetching interactions:", err);
    res.status(500).json({ error: "Failed to fetch interactions" });
  }
});

// Delete an interaction
router.delete("/interactions/:id", async (req, res) => {
  try {
    await Interaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Interaction deleted successfully" });
  } catch (err) {
    console.error("Error deleting interaction:", err);
    res.status(500).json({ error: "Failed to delete interaction" });
  }
});

export default router;
