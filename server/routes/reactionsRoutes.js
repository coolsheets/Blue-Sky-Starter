import { Router } from "express";
import { createReaction,findAllReactions,findReactionByVideoURL } from "../models/reactions.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

const router = Router();

router.get('/', async function (req, res) {
    try {
        const data = await findAllReactions()
        res.send(data)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


router.post('/', authenticateToken,async (req, res) => {
    const { Video_URL,
        User_ID,
        Reaction_Type,
        Star,
        Comment } = req.body

    if (req.body) {
        const data = createReaction( Video_URL,
            User_ID,
            Reaction_Type,
            Star,
            Comment)
        return res.send(data)
    }
    else {
        return res.sendStatus(400)
    }
})


router.get("/:videoUrl", async function (req, res) {
  try {
    const videoUrl = decodeURIComponent(req.params.videoUrl);
    const reactions = await findReactionByVideoURL(videoUrl); // match exactly what's stored
    res.send(reactions);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router