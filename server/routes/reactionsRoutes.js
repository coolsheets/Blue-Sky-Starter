import { Router } from "express";
import {
  createReaction,
  findAllReactions,
  findReactionByVideoURL,
  toggleFavoriteForUserAndVideo,
  isVideoFavoritedByUser,
} from "../models/reactions.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await findAllReactions();
    res.send(data);
  } catch (error) {
    console.error("Error fetching reactions:", error);
    res.sendStatus(500);
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { Video_URL, Reaction_Type, Star, Comment } = req.body;
  if (!Video_URL) return res.sendStatus(400);

  try {
    const data = await createReaction(
      Video_URL,
      req.user.userId,
      Reaction_Type,
      Star,
      Comment
    );
    res.send(data);
  } catch (err) {
    console.error("Failed to create reaction:", err);
    res.status(500).json({ message: "Failed to create reaction" });
  }
});

router.get("/:videoUrl", async (req, res) => {
  try {
    const videoUrl = decodeURIComponent(req.params.videoUrl);
    const reactions = await findReactionByVideoURL(videoUrl);
    res.send(reactions);
  } catch (error) {
    console.error("Error fetching reactions by video URL:", error);
    res.sendStatus(500);
  }
});

// ✅ Toggle favorite status (correct)
router.post("/favorite/:videoUrl", authenticateToken, async (req, res) => {
  try {
    const videoUrl = decodeURIComponent(req.params.videoUrl);
    const favorited = await toggleFavoriteForUserAndVideo(videoUrl, req.user.userId);
    res.json({ favorited });
  } catch (error) {
    console.error("Favorite toggle error:", error);
    res.status(500).json({ message: "Error toggling favorite" });
  }
});

// ✅ Check if a video is favorited by user
router.get("/favorite/:videoUrl", authenticateToken, async (req, res) => {
  try {
    const videoUrl = decodeURIComponent(req.params.videoUrl);
    const favorited = await isVideoFavoritedByUser(videoUrl, req.user.userId);
    res.json({ favorited });
  } catch (error) {
    console.error("Favorite check error:", error);
    res.status(500).json({ message: "Error checking favorite status" });
  }
});

export default router;
